import { Request, Response } from 'express';
import service from '../services';

export default {
  async create(req: Request, res: Response) {
    const { name, email, tel } = req.body;
    const newClient = await service.client.create({ name, email, tel });
    return res.status(201).json(newClient);
  },

  async readOne(req: Request, res: Response) {
    const { id } = req.params;
    const client = await service.client.readOne(id);
    return res.status(200).json(client);
  }
};