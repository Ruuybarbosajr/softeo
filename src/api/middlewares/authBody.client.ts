import { Client } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import AppError from '../../utils/appError';
import bodyAuthentication from '../../utils/bodyAuthentication';
import schemas from '../schemas';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { name, email, tel } = req.body;

  const isValidBody = bodyAuthentication<Omit<Client, 'id'>>(
    schemas.newClient, { name, email, tel }
  );

  if (isValidBody) return next(new AppError('Campos inválidos'));
  next();
};