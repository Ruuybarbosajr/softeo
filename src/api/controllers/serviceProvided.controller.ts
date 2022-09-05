import { Request, Response } from 'express';
import INewServiceProvided from '../../interfaces/INewServiceProvided';
import IQueryParams from '../../interfaces/IQueryParams';
import IUpdateServiceProvided from '../../interfaces/IUpdateServiceProvided';
import services from '../services';

export default {
  async create(req: Request, res: Response) {
    const { 
      clientId,
      serviceId, 
      installmentsContracted,
      installmentsPaid,
      obs,
    } = req.body as INewServiceProvided;

    const newServiceProvided = await services.serviceProvided.create({ 
      clientId,
      serviceId, 
      installmentsContracted,
      installmentsPaid,
      obs,
    });

    return res.status(201).json(newServiceProvided);
  },

  async readOne(req: Request, res: Response) {
    const { id } = req.params;
    const serviceProvided = await services.serviceProvided.readOne(id);
    return res.status(200).json(serviceProvided);
  },

  async readAll(req: Request, res: Response) {
    const { gte, lte, month } = req.query as IQueryParams;
    const allServiceProvided = await services.serviceProvided.readAll({ gte, lte, month });
    return res.status(200).json(allServiceProvided);
  },

  async update(req: Request, res: Response) {
    const { installmentsPaid, obs } = req.body as IUpdateServiceProvided;
    const { id } = req.params;
    const updatedService = await services.serviceProvided.update(id, { installmentsPaid, obs });
    return res.status(200).json(updatedService);
  },

  async destroy(req: Request, res: Response) {
    const { id } = req.params;
    await services.serviceProvided.destroy(id);
    return res.status(204).end();
  }
};