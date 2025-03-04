"use client";

import { checkTodoStatus } from "@/database/actions/todo.actions";
import { Checkbox } from "./ui/checkbox";
import { CheckboxProps, HandleCheckProps } from "@/types/types";

const CheckTodo = ({
  todoId,
  isCompleted,
  taskId,
  taskListId,
}: CheckboxProps) => {
  const handleCheck = async ({ id, taskId, taskListId }: HandleCheckProps) => {
    try {
      await checkTodoStatus({
        todoId: id,
        isCompleted,
        taskId,
        taskListId,
      });
    } catch (error) {
      console.log("Failed to change the status", error);
    }
  };
  return (
    <Checkbox
      value={todoId}
      onCheckedChange={() => handleCheck({ id: todoId, taskId, taskListId })}
    />
  );
};

export default CheckTodo;
