import { NextFunction, Request, Response } from 'express';
import INewService from '../../interfaces/INewService';
import AppError from '../../utils/appError';
import bodyAuthentication from '../../utils/bodyAuthentication';
import schemas from '../schemas';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { name, price, maxInstallments  } = req.body as INewService;
  const isValidBody = bodyAuthentication<INewService>(
    schemas.newService, { name, price, maxInstallments }
  );
    
  if (isValidBody) return next(new AppError('Campos inválidos'));
  next();
};