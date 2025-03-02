"use client";

import { checkTodoStatus } from "@/database/actions/todo.actions";
import { Checkbox } from "./ui/checkbox";

const CheckTodo = ({
  todoId,
  isCompleted,
  taskId,
  taskListId,
  clerkId,
}: {
  todoId: string;
  isCompleted: "pending" | "completed";
  taskId: string;
  taskListId: string;
  clerkId: string;
}) => {
  const handleCheck = async ({
    id,
    taskId,
    taskListId,
    clerkId,
  }: {
    id: string;
    taskId: string;
    taskListId: string;
    clerkId: string;
  }) => {
    try {
      await checkTodoStatus({
        todoId: id,
        isCompleted,
        taskId,
        taskListId,
        clerkId,
      });
    } catch (error) {
      console.log("Failed to change the status", error);
    }
  };
  return (
    <Checkbox
      value={todoId}
      onCheckedChange={() =>
        handleCheck({ id: todoId, taskId, taskListId, clerkId })
      }
    />
  );
};

export default CheckTodo;
