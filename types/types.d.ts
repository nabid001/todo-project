export interface ICreateTodo {
  title: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
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
