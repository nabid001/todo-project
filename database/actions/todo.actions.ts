"use server";

import { ICreateTodo } from "@/types/types";
import { connectToDatabase } from "../db";
import Todo, { ITodo } from "../models/todo.model";
import { parseData } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const getTodo = async () => {
  try {
    await connectToDatabase();

    const data = await Todo.find();

    return parseData(data);
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
}: ICreateTodo) => {
  try {
    await connectToDatabase();

    const newTodo: ITodo = await Todo.create({
      title,
      description,
      dueDate,
      status,
      priority,
    });

    if (!newTodo) {
      throw new Error("Failed to create todo");
    }

    revalidatePath("/");
    console.log("Todo created successfully");
    return parseData(newTodo);
  } catch (error) {
    console.log(error);
  }
};

// export const updateTodo = async ({ id, title, description }: ITask<ex>) => {
//   try {
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const deleteTodo = async (id: string) => {
//   try {
//   } catch (error) {
//     console.log(error);
//   }
// };
