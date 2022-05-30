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

export const findCommentsByPublicationId = async (
    publicationId: string,
): Promise<IComment[]> => {
  try {
    return await Comment.find({publicationId});
  } catch (error) {
    console.log(error);
    throw new Error('Server Error');
  }
};
