import { NextFunction, Request, Response } from 'express';
import INewServiceProvided from '../../interfaces/INewServiceProvided';
import AppError from '../../utils/appError';
import bodyAuthentication from '../../utils/bodyAuthentication';
import schemas from '../schemas';

export default (req: Request, _res: Response, next: NextFunction) => {
  const {
    clientId,
    installmentsContracted,
    installmentsPaid,
    serviceId
  } = req.body as INewServiceProvided;

  const isValidBody = bodyAuthentication<INewServiceProvided>(
    schemas.newServiceProvided, {
      clientId,
      installmentsContracted,
      installmentsPaid,
      serviceId
    }
  );
  
  if (isValidBody) return next(new AppError('Campos inválidos'));
  next();
};