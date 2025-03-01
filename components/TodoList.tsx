"use client";

import { cn, priorityConfig } from "@/lib/utils";
import CheckTodo from "./CheckTodo";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import DeleteTodo from "./DeleteTodo";

interface TodoListProps {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "pending" | "completed";
  priority: "high" | "medium" | "low";
  user: {
    _id: string;
    clerkId: string;
    name: string;
    username: string;
    email: string;
    picture: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
}
const TodoList = ({ todos }: { todos: TodoListProps[] }) => {
  return (
    <ul className="space-y-3">
      {todos.length > 0 &&
        todos.map((todo) => (
          <li
            key={todo._id}
            className="group flex items-center gap-3 p-4 rounded-lg transition-all bg-gray-50 hover:bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-gray-100 dark:border-slate-700"
          >
            <CheckTodo todoId={todo._id} isCompleted={todo.status} />

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3
                    className={cn(
                      "font-medium text-slate-900 dark:text-slate-100",
                      todo.status === "completed" &&
                        "line-through text-slate-500 dark:text-slate-400"
                    )}
                  >
                    {todo.title}
                  </h3>
                  <span
                    className={cn(
                      "flex items-center",
                      priorityConfig[todo.priority].color
                    )}
                  >
                    {priorityConfig[todo.priority].icon}
                  </span>
                </div>
                <Badge
                  variant={todo.status === "completed" ? "outline" : "default"}
                  className={cn(
                    "ml-auto shrink-0",
                    todo.status === "completed"
                      ? "text-green-500 dark:text-green-400"
                      : "bg-blue-500 hover:bg-blue-600"
                  )}
                >
                  {todo.status === "completed" ? "Completed" : "Pending"}
                </Badge>
              </div>

              {todo.description && (
                <p
                  className={cn(
                    "text-sm text-slate-500 dark:text-slate-400 mt-1",
                    todo.status === "completed" && "line-through"
                  )}
                >
                  {todo.description}
                </p>
              )}

              <div className="flex items-center mt-2 text-xs text-slate-500 dark:text-slate-400">
                <Calendar className="h-3 w-3 mr-1" />
                {format(todo.dueDate, "PPP")}
              </div>
            </div>

            {todo.user._id === todo.user._id && (
              <DeleteTodo clerkId={todo.user.clerkId} todoId={todo._id} />
            )}
          </li>
        ))}
    </ul>
  );
};

export default TodoList;
