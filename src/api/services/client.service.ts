import INewClient from '../../interfaces/INewClient';
import repository from '../../database/Repository';
import AppError from '../../utils/appError';


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
};