import INewClient from '../../interfaces/INewClient';
import repository from '../../database/Repository';
import AppError from '../../utils/appError';

export default {
  async create(newClient: INewClient) {
    const findUser = await repository.client.readOne(newClient.email);

    if (findUser) throw new AppError('Cliente já está cadastrado', 409);
    
    return repository.client.create(newClient);
  },

  async readOne(id: string) {
    const findUser = await repository.client.readOne(id);

    if (!findUser) throw new AppError('Cliente não encontrado', 404);

    return findUser;
  }
};