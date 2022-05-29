import {IComment, ICreateComment} from '../interfaces/comment';
import Comment from '../models/comment';

export const createComment = async (
    data: ICreateComment,
): Promise<IComment> => {
  try {
    const comment = new Comment({...data});
    await comment.save();

    return comment;
  } catch (error) {
    console.log(error);
    throw new Error('Server Error');
  }
};
