import jwt from 'jsonwebtoken';

export const generateToken = ({id}: { id: string }): string => {
  const payload = {id};
  return jwt.sign(payload, process.env.SECRET_KEY_JWT!, {
    expiresIn: '4h',
  });
};
