"use server";

import { CheckTodoProps, ICreateTodo, IDeleteTodo } from "@/types/types";
import { connectToDatabase } from "../db";
import Todo, { ITodo } from "../models/todo.model";
import { parseData } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { startOfDay, endOfDay } from "date-fns";
import { createGoogleTask, getOAuthClient } from "@/lib/google";
import { google } from "googleapis";

export const getTodo = async ({
  status,
  dueDate,
  email,
}: {
  status: string;
  dueDate: string;
  email: string | undefined;
}) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Failed to fetch Todo. Because user not found");
    }

    const start = startOfDay(dueDate);
    const end = endOfDay(dueDate);

    if (dueDate) {
      const dataFilteredByDate = await Todo.find({
        user: user._id,
        dueDate: { $gte: start, $lte: end },
      })
        .populate("user")
        .sort({ createdAt: -1 });

      return parseData(dataFilteredByDate);
    } else if (status) {
      const dataFilteredByStatus = await Todo.find({
        user: user._id,
        status,
      })
        .populate("user")
        .sort({ createdAt: -1 });
      return parseData(dataFilteredByStatus);
    } else {
      const data = await Todo.find({
        user: user?._id,
      })
        .populate("user")
        .sort({ createdAt: -1 });

      return parseData(data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const createTodo = async ({
  title,
  description,
  dueDate,
  status,
  priority,
  email,
}: ICreateTodo) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found. You can't create Todo without a user");
    }

    const newTodo: ITodo = await Todo.create({
      title,
      description,
      dueDate,
      status,
      priority,
      user: user._id,
    });

    if (!newTodo) {
      throw new Error("Failed to create todo");
    }

    const googleTask = await createGoogleTask({
      title,
      description,
      dueDate,
      status,
      priority,
    });

    if (!googleTask || !googleTask.task || !googleTask.taskListId) {
      throw new Error("Failed to create Google Task");
    }

    await Todo.findByIdAndUpdate(
      newTodo._id,
      {
        $set: {
          taskId: googleTask.task,
          taskListId: googleTask.taskListId,
        },
      },
      { new: true }
    );

    revalidatePath("/");
    return parseData(newTodo);
  } catch (error) {
    console.log(error);
  }
};

export const checkTodoStatus = async ({
  todoId,
  isCompleted,
  taskId,
  taskListId,
}: CheckTodoProps) => {
  try {
    await connectToDatabase();

    const oAuthClient = await getOAuthClient();
    if (!oAuthClient) {
      throw new Error("Not authenticated with Google");
    }

    const task = google.tasks({ version: "v1", auth: oAuthClient });

    const currentTask = await task.tasks.get({
      task: taskId,
      tasklist: taskListId,
    });

    if (!currentTask.data.status) {
      throw new Error("Failed to check task status");
    }

    let updatedStatus = {};
    const todo = await Todo.findById(todoId);
    if (!todo) {
      throw new Error("Todo not found");
    }

    if (isCompleted === "completed") {
      updatedStatus = { $set: { status: "pending" } };

      await task.tasks.update({
        tasklist: taskListId,
        task: taskId,
        requestBody: {
          ...currentTask.data,
          status: "pending",
        },
      });
    } else {
      updatedStatus = { $set: { status: "completed" } };

      await task.tasks.update({
        tasklist: taskListId,
        task: taskId,
        requestBody: {
          ...currentTask.data,
          status: "completed",
          completed: new Date().toISOString(),
        },
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, updatedStatus, {
      new: true,
    });

    revalidatePath("/");
    return parseData(updatedTodo);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async ({
  todoId,
  taskId,
  taskListId,
}: IDeleteTodo) => {
  try {
    await connectToDatabase();

    const oAuthClient = await getOAuthClient();
    if (!oAuthClient) {
      throw new Error("Not authenticated with Google");
    }

    const task = google.tasks({ version: "v1", auth: oAuthClient });

    await Todo.deleteOne({ _id: todoId });

    await task.tasks.delete({
      task: taskId,
      tasklist: taskListId,
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
