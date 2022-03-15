import jwt from 'jsonwebtoken';
import express from 'express';

export const generateToken = ({id}: { id: string }): string => {
  const payload = {id};
  return jwt.sign(payload, process.env.SECRET_KEY_JWT!, {
    expiresIn: '4h',
  });
};

export const validateToken = (
    req: express.Request,
    requireAuth = true,
): string | void => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const {id} = jwt.verify(
          token,
        process.env.SECRET_KEY_JWT!,
      ) as { id: string };
      return id;
    } catch (error) {
      console.log(error);
      throw new Error('Token inválido');
    }
  }

  if (requireAuth) throw new Error('No hay token en la petición');
};
