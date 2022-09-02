import INewService from '../../interfaces/INewService';
import repository from '../../database/Repository';
import AppError from '../../utils/appError';
import { Service } from '@prisma/client';


export default {
  async create(newService: INewService) {
    const findService = await repository.service.readOne(newService.name);
    if (findService) throw new AppError('Serviço já está cadastrado', 409);
    return repository.service.create(newService);
  },

  async readOne(id: string) {
    const findService = await repository.service.readOne(id);
    if (!findService) throw new AppError('Serviço não encontrado', 404);
    return findService;
  },

  async readAll() { return repository.service.readAll(); },

  async update(id: string, obj: Omit<Service, 'id'>) {
    await this.readOne(id);
    return repository.service.update(id, obj);
  },

  async destroy(id: string) {
    await this.readOne(id);
    await repository.service.destroy(id);
  }
};