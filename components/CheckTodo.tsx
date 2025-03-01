"use client";

import { checkTodoStatus } from "@/database/actions/todo.actions";
import { Checkbox } from "./ui/checkbox";

const CheckTodo = ({
  todoId,
  isCompleted,
}: {
  todoId: string;
  isCompleted: "pending" | "completed";
}) => {
  const handleCheck = async (id: string) => {
    try {
      await checkTodoStatus({ todoId: id, isCompleted });
    } catch (error) {
      console.log("Failed to change the status", error);
    }
  };
  return (
    <Checkbox value={todoId} onCheckedChange={() => handleCheck(todoId)} />
  );
};

export default CheckTodo;
