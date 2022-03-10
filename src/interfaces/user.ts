export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  web?: string;
  description?: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserAuth {
  readonly user: IUser;
  readonly token: string;
}

export type CreateUserInput = Omit<IUser, 'id' | 'avatar' | 'web' | 'description' | 'createdAt' | 'updatedAt'>

export type LoginUserInput = Pick<IUser, 'email' | 'password'>
