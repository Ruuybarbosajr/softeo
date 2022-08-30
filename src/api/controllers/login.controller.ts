import { Request, Response } from 'express';
import ILogin from '../../interfaces/ILogin';
import service from '../services';

export default {
  async execute(req: Request, res: Response) {
    const { username, password } = req.body as ILogin;
    const token = await service.login.execute({ username, password });
    return res.status(200).json({ token });
  }
};