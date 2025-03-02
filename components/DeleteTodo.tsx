"use client";

import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { deleteTodo } from "@/database/actions/todo.actions";
import { toast } from "sonner";
import { IDeleteTodo } from "@/types/types";

const DeleteTodo = ({ clerkId, todoId, taskId, taskListId }: IDeleteTodo) => {
  const handleDelete = async ({
    clerkId,
    todoId,
    taskId,
    taskListId,
  }: IDeleteTodo) => {
    try {
      await deleteTodo({ clerkId, todoId, taskId, taskListId });

      toast("Todo deleted successfully", {
        description: "Todo has from your list",
      });
    } catch (error) {
      toast("Error deleting todo", {
        description: "Failed to delete todo",
      });
      console.error("Error deleting todo:", error);
    }
  };
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleDelete({ clerkId, todoId, taskId, taskListId })}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="h-4 w-4 text-red-500" />
        <span className="sr-only">Delete</span>
      </Button>
    </>
  );
};

export default DeleteTodo;
