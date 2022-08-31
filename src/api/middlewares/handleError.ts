import { NextFunction, Request, Response } from 'express';
import IAppError from '../../interfaces/IAppError';
import AppError from '../../utils/appError';

export default (error: Error | IAppError, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  console.log(error.message);
  return res.status(500).json({ message: 'Internal server error '});
};