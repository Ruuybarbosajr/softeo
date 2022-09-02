import INewClient from '../../interfaces/INewClient';
import repository from '../../database/Repository';
import AppError from '../../utils/appError';
import { Client } from '@prisma/client';


export default {
  async create(newClient: INewClient) {
    const findClient = await repository.client.readOne(newClient.email);
    if (findClient) throw new AppError('Cliente já está cadastrado', 409);
    return repository.client.create(newClient);
  },

  async readOne(id: string) {
    const findClient = await repository.client.readOne(id);
    if (!findClient) throw new AppError('Cliente não encontrado', 404);
    return findClient;
  },

  async readAll() { return repository.client.readAll(); },

  async update(id: string, obj: Omit<Client, 'id'>) {
    await this.readOne(id);
    return repository.client.update(id, obj);
  },

  async destroy(id: string) {
    await this.readOne(id);
    await repository.client.destroy(id);
  }
};