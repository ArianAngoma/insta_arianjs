import {ICreatePublication, IPublication} from '../interfaces/publication';
import Publication from '../models/publication';

export const createPublication = async (
    data: ICreatePublication,
): Promise<IPublication> => {
  try {
    const publication = new Publication({...data});
    await publication.save();

    return publication;
  } catch (error) {
    console.log(error);
    throw new Error('Server Error');
  }
};
