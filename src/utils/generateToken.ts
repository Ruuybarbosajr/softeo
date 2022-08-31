import { Admin } from '@prisma/client';
import jwt from 'jsonwebtoken';
import 'dotenv';

export default (payload: Pick<Admin, 'id' | 'username'>) => {
  const jwtKey = process.env.JWT_SECRET as jwt.Secret;

  const token = jwt.sign(payload, jwtKey);
  return token;
};