import IAppError from '../interfaces/IAppError';

export default class AppError implements IAppError {
  constructor(public message: string, public statusCode = 400){}
}