"use client";

import { Loader2Icon, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { deleteTodo } from "@/database/actions/todo.actions";
import { toast } from "sonner";
import { IDeleteTodo } from "@/types/types";
import { useState } from "react";

const DeleteTodo = ({ clerkId, todoId, taskId, taskListId }: IDeleteTodo) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async ({
    clerkId,
    todoId,
    taskId,
    taskListId,
  }: IDeleteTodo) => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleDelete({ clerkId, todoId, taskId, taskListId })}
        className="hover:opacity-70 transition-all"
      >
        {isLoading ? (
          <Loader2Icon className="h-4 w-4 p-0 m-0 text-red-400 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4 text-red-400" />
        )}
      </Button>
    </>
  );
};

export default DeleteTodo;
