import { Request, Response } from 'express';
import services from '../services';

export default {
  async create(req: Request, res: Response) {
    const { name, price, maxInstallments } = req.body;
    const newService = await services.service.create({ name, price, maxInstallments });
    return res.status(201).json(newService);
  },

  async readOne(req: Request, res: Response) {
    const { id } = req.params;
    const service = await services.service.readOne(id);
    return res.status(200).json(service);
  },

  async readAll(_req: Request, res: Response) {
    const allServices = await services.service.readAll();
    return res.status(200).json(allServices);
  },
};