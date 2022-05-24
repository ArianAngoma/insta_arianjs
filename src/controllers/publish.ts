import express from 'express';
import {v4 as uuidv4} from 'uuid';

import {IPublish} from '../interfaces/publication';

import {validateToken} from '../helpers/jwt';
import {findUserById} from '../entities/user';
import {awsUploadImage} from '../utils/aws-image';
import {createPublication} from '../entities/publication';

export const publish = async (
    req: express.Request,
    file: any,
): Promise<IPublish> => {
  const userId = validateToken(req, true);
  if (!userId) throw new Error('Token inválido');

  const user = await findUserById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  const {createReadStream, mimetype} = await file;
  const fileExtension = mimetype.split('/')[1];

  const fileName = `publication/${uuidv4()}.${fileExtension}`;

  const fileData = createReadStream();

  try {
    const fileUpload = await awsUploadImage(fileData, fileName);
    await createPublication({
      userId,
      file: fileUpload,
      fileType: mimetype.split('/')[0],
    });

    return {
      status: true,
      urlFile: fileUpload,
    };
  } catch (error) {
    return {
      status: false,
      urlFile: 'Error al subir la imagen',
    };
  }
};
