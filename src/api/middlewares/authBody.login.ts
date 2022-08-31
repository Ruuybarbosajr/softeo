import { NextFunction, Request, Response } from 'express';
import schemas from '../schemas';
import AppError from '../../utils/appError';
import bodyAuthentication from '../../utils/bodyAuthentication';
import ILogin from '../../interfaces/ILogin';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (
    bodyAuthentication<ILogin>(schemas.login, { username, password })
  ) return next(new AppError('Campos inválidos'));

  next();
};