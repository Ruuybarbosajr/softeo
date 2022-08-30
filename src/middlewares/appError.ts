import IAppError from '../interfaces/IAppError';

export default (message: string, statusCode = 400): IAppError => ({
  message, statusCode
});