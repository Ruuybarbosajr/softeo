import { NextFunction, Request, Response } from 'express';
import INewClient from '../../interfaces/INewClient';
import AppError from '../../utils/appError';
import bodyAuthentication from '../../utils/bodyAuthentication';
import schemas from '../schemas';

export default {
  create(req: Request, _res: Response, next: NextFunction) {
    const { name, email, tel } = req.body;

    const isValidBody = bodyAuthentication<INewClient>(
      schemas.newClient, { name, email, tel }
    );

    if (isValidBody) return next(new AppError('Campos inválidos'));
    next();
  }
};