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

    const serviceProvidedCreated = await repository.serviceProvided.create(newServiceProvided);
    const { id, installmentsContracted, createdAt } = serviceProvidedCreated;

    const date = {
      month: new Date(createdAt).getMonth(),
      year: new Date(createdAt).getFullYear(),
      day: new Date(createdAt).getDay(),
    };

    const insertInstallments = Array.from({ length: installmentsContracted }).map((_, index) => {
      return {
        serviceProvidedId: id,
        numberInstallment: index + 1,
        dateInstallment: new Date(date.year, date.month + index, date.day),
        priceInstallment: service.price / installmentsContracted
      };
    });

    await repository.installmentsServiceProvided.create(insertInstallments);
    return serviceProvidedCreated;
  },

  async readOne(id: string) {
    const findServiceProvided = await repository.serviceProvided.readOne(id);
    if (!findServiceProvided) throw new AppError('Serviço prestado não encontrado', 404);
    return findServiceProvided;
  },

  async readAll({ gte, lte, month }: IQueryParams) {
    if (month) {
      const fullYear = new Date().getFullYear();
      return (await repository.installmentsServiceProvided.readAll({
        dateInstallment: {
          lte: new Date(fullYear, Number(month) + 1, 0),
          gte: new Date(fullYear, Number(month), 1),
        }
      })).map(({ serviceProvided }) => serviceProvided);
    }

    return (await repository.installmentsServiceProvided.readAll({
      dateInstallment: {
        lte,
        gte
      }
    })).map(({ serviceProvided }) => serviceProvided);
  },

  async update(id: string, obj: IUpdateServiceProvided) {
    await this.readOne(id);
    return repository.serviceProvided.update(id, obj);
  },

  async destroy(id: string) {
    await this.readOne(id);
    await repository.serviceProvided.destroy(id);
  }
};