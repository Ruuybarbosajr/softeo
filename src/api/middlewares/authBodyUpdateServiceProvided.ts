import { NextFunction, Request, Response } from 'express';
import IUpdateServiceProvided from '../../interfaces/IUpdateServiceProvided';
import AppError from '../../utils/appError';
import bodyAuthentication from '../../utils/bodyAuthentication';
import schemas from '../schemas';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { installmentsPaid } = req.body as IUpdateServiceProvided;

  const isValidBody = bodyAuthentication<IUpdateServiceProvided>(
    schemas.updateServiceProvided, { installmentsPaid }
  );
  
  if (isValidBody) return next(new AppError('Campos inválidos'));
  next();
};