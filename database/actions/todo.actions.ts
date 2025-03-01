"use server";

import { ICreateTodo } from "@/types/types";
import { connectToDatabase } from "../db";
import Todo, { ITodo } from "../models/todo.model";
import { parseData } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { startOfDay, endOfDay } from "date-fns";

export const getTodo = async ({
  status,
  dueDate,
  clerkId,
}: {
  status: string;
  dueDate: string;
  clerkId: string;
}) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found");
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
        user: user._id,
        $and: [{}],
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
  clerkId,
}: ICreateTodo) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found");
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

    revalidatePath("/");
    return parseData(newTodo);
  } catch (error) {
    console.log(error);
  }
};

export const checkTodoStatus = async ({
  todoId,
  isCompleted,
}: {
  todoId: string;
  isCompleted: "pending" | "completed";
}) => {
  try {
    await connectToDatabase();
    let updatedStatus = {};

    const todo = await Todo.findById(todoId);
    if (!todo) {
      throw new Error("Todo not found");
    }

    if (isCompleted === "completed") {
      updatedStatus = { $set: { status: "pending" } };
    } else {
      updatedStatus = { $set: { status: "completed" } };
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
  clerkId,
  todoId,
}: {
  clerkId: string;
  todoId: string;
}) => {
  try {
    await connectToDatabase();

    const userWithTodo = await Todo.find({ clerkId });
    if (userWithTodo) {
      await Todo.deleteOne({ _id: todoId });
    }

    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
