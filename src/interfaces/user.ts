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

export type GetUserInput = Pick<IUser, 'id' | 'email' | 'username'>

export interface SearchUserInput {
  query: string;
}

export interface IUpdateUserInput extends Omit<Partial<IUser>, 'id' | 'password' | 'createdAt' | 'updatedAt'> {
  currentPassword?: string;
  newPassword?: string;
}

export interface IUserAvatar {
  status: boolean;
  urlAvatar: string | null;
}

export interface IFilterUserExcludingDocumentBySpecificField {
  field: keyof Omit<IUser & { _id: string }, 'id'>;
  value: any;
}
