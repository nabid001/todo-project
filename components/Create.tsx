"use client";

import { Button } from "@/components/ui/button";
import { createTodo } from "@/database/actions/todo.actions";
import React from "react";
import { toast } from "sonner";

const Create = ({ clerkId }: { clerkId: string }) => {
  const handleClick = async () => {
    toast("Todo created successfully", {
      description: "Task added to your list",
    });
  };

  return (
    <div>
      <Button onClick={handleClick}>Add todo</Button>
    </div>
  );
};

export default Create;
