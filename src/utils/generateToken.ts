import { Admin } from '@prisma/client';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

export default (payload: Pick<Admin, 'id' | 'username'>) => {
  const jwtKey = fs.readFileSync(path.join(__dirname, '../jwt.evaluation.key'), { encoding: 'utf-8' });
  const token = jwt.sign(payload, jwtKey);
  return token;
};