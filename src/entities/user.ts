import {
  CreateUserInput,
  GetUserInput,
  IUser,
  IUpdateUserInput, IFilterUserExcludingDocumentBySpecificField,
} from '../interfaces/user';

import User from '../models/user';

export const createUser = async (data: CreateUserInput): Promise<IUser> => {
  try {
    const user = new User({...data});
    await user.save();

    return user;
  } catch (e) {
    console.log(e);
    throw new Error('Server Error');
  }
};

export const findUserByUsernameOrEmail = async ({
  email,
  username,
}: { email?: string, username?: string }): Promise<IUser | null> => {
  try {
    return await User.findOne({
      $or: [
        {email},
        {username},
      ],
    });
  } catch (error) {
    console.log(error);
    throw new Error('Server Error');
  }
};

export const findUserByIdOrEmailOrUsername = async ({
  id,
  email,
  username,
}: GetUserInput): Promise<IUser | null> => {
  try {
    return await User.findOne({
      $or: [
        {_id: id},
        {email},
        {username},
      ],
    });
  } catch (error) {
    console.log(error);
    throw new Error('Server Error');
  }
};

export const findUserByEmail = async (
    {email}: { email: string },
): Promise<IUser | null> => {
  try {
    return await User.findOne({email});
  } catch (error) {
    console.log(error);
    throw new Error('Server Error');
  }
};

export const findUserById = async (id: string): Promise<IUser | null> => {
  try {
    return await User.findById(id);
  } catch (error) {
    console.log(error);
    throw new Error('Server Error');
  }
};

export const findUserByName = async (query: string): Promise<IUser[]> => {
  try {
    return await User.find({
      name: {
        $regex: query,
        $options: 'i',
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error('Server Error');
  }
};

export const updateUserById = async (
    id: string,
    data: IUpdateUserInput & { password?: string },
): Promise<IUser | null> => {
  try {
    return await User.findByIdAndUpdate(id, {...data}, {new: true});
  } catch (error) {
    console.log(error);
    throw new Error('Server Error');
  }
};

export const findUserExcludingDocumentBySpecificField = async (
    filter: IFilterUserExcludingDocumentBySpecificField,
    document: IFilterUserExcludingDocumentBySpecificField,
): Promise<IUser[]> => {
  try {
    return await User.find({
      $and: [
        {
          [document.field]: {$ne: document.value},
        },
        {
          [filter.field]: filter.value,
        },
      ],
    });
  } catch (error) {
    console.log(error);
    throw new Error('Server Error');
  }
};
