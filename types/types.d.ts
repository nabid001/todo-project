export type Priority = "high" | "medium" | "low";

export interface ICreateTodo {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  priority: string;
  clerkId: string;
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface IDeleteTodo {
  todoId: string;
  clerkId: string;
  taskId: string;
  taskListId: string;
}

type TaskInput = {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  priority: string;
  clerkId: string;
};

type TaskResponse = {
  success: boolean;
  task?: any;
  error?: string;
  taskListId?: string;
};

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
  taskId: string;
  taskListId: string;
}
