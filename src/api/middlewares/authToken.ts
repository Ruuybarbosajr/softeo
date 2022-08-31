import { NextFunction, Request, Response } from 'express';
import AppError from '../../utils/appError';
import decodeToken from '../../utils/decodeToken';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return next(new AppError('Você não possui autorização', 401));

  const decoded = decodeToken(authorization);

  if (decoded.error) return next(new AppError('Você não possui autorização', 401));
  next();
};