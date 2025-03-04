"use client";

import { checkTodoStatus } from "@/database/actions/todo.actions";
import { Checkbox } from "./ui/checkbox";
import { CheckboxProps, HandleCheckProps } from "@/types/types";

const CheckTodo = ({
  todoId,
  isCompleted,
  taskId,
  taskListId,
  googleId,
}: CheckboxProps) => {
  const handleCheck = async ({
    id,
    taskId,
    taskListId,
    googleId,
  }: HandleCheckProps) => {
    try {
      await checkTodoStatus({
        todoId: id,
        isCompleted,
        taskId,
        taskListId,
        googleId,
      });
    } catch (error) {
      console.log("Failed to change the status", error);
    }
  };
  return (
    <Checkbox
      value={todoId}
      onCheckedChange={() =>
        handleCheck({ id: todoId, taskId, taskListId, googleId })
      }
    />
  );
};

export default CheckTodo;
