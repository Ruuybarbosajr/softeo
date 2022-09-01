import { Client } from '@prisma/client';
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
  },

  async readAll(_req: Request, res: Response) {
    const allClients = await service.client.readAll();
    return res.status(200).json(allClients);
  },

  async update(req: Request, res: Response) {
    const { name, email, tel } = req.body as Omit<Client, 'id'>;
    const { id } = req.params;

    const updatedClient = await service.client.update(id, { name, email, tel });
    return res.status(200).json(updatedClient);
  }
};