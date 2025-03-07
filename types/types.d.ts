export type Priority = "high" | "medium" | "low";

export interface ICreateTodo {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  priority: string;
  email: string | undefined | null;
}

interface CheckTodoProps {
  todoId: string;
  isCompleted: "pending" | "completed";
  taskId: string;
  taskListId: string;
}

interface CheckboxProps {
  todoId: string;
  isCompleted: "pending" | "completed";
  taskId: string;
  taskListId: string;
}

interface HandleCheckProps {
  id: string;
  taskId: string;
  taskListId: string;
}

export interface CreateUserParams {
  googleId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface UpdateUserParams {
  googleId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface IDeleteTodo {
  todoId: string;
  googleId: string;
  taskId: string;
  taskListId: string;
}

type TaskInput = {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  priority: string;
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
    googleId: string;
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
