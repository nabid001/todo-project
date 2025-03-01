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
