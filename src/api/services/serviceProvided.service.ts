import INewServiceProvided from '../../interfaces/INewServiceProvided';
import repository from '../../database/Repository';
import AppError from '../../utils/appError';
import serviceClient from './client.service';
import serviceService from './service.service';
import IQueryParams from '../../interfaces/IQueryParams';
import { Client, Service } from '@prisma/client';
import IUpdateServiceProvided from '../../interfaces/IUpdateServiceProvided';

async function verifyUserAndService(newServiceProvided: INewServiceProvided): 
Promise<[Promise<Client>, Promise<Service>]> {
  return [
    serviceClient.readOne(newServiceProvided.clientId),
    serviceService.readOne(newServiceProvided.serviceId)
  ];
}

export default {
  async create(newServiceProvided: INewServiceProvided) {
    const [,service] = await Promise.all(await verifyUserAndService(newServiceProvided));

    if (newServiceProvided.installmentsContracted > service.maxInstallments) {
      throw new AppError('Número de parcelas indisponível');
    }
    return repository.serviceProvided.create(newServiceProvided);
  },

  async readOne(id: string) {
    const findServiceProvided = await repository.serviceProvided.readOne(id);
    if (!findServiceProvided) throw new AppError('Serviço prestado não encontrado', 404);
    return findServiceProvided;
  },

  async readAll({ gte, lte, month }: IQueryParams) {
    if (month) {
      const fullYear = new Date().getFullYear();
      return repository.serviceProvided.readAll({
        createdAt: {
          lte: new Date(fullYear, Number(month) + 1, 0),
          gte: new Date(fullYear, Number(month), 1),
        }
      });
    }

    return repository.serviceProvided.readAll({
      createdAt: {
        lte,
        gte
      }
    });
  },

  async update(id: string, obj: IUpdateServiceProvided) {
    await this.readOne(id);
    return repository.serviceProvided.update(id, obj);
  },

  // async destroy(id: string) {
  //   await this.readOne(id);
  //   await repository.serviceProvided.destroy(id);
  // }
};