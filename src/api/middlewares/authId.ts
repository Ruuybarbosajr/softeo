import { NextFunction, Request, Response } from 'express';
import { validate as uuidValidate } from 'uuid';
import AppError from '../../utils/appError';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { id } = req.params;

  const isValidId = uuidValidate(id);
  if (!isValidId) return next(new AppError('Id inválido'));

  next();
};