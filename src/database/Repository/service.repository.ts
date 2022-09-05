import { Service } from '@prisma/client';
import INewService from '../../interfaces/INewService';
import { prisma } from '../cliente';

export default {
  async readOne(id: string): Promise<Service | null> {
    return prisma.service.findUnique({
      where: {
        id
      }
    });
  },

  async create(obj: INewService): Promise<Service> {
    return prisma.service.create({
      data: { ...obj }
    });
  },

  async readAll(): Promise<Service[]> { return prisma.service.findMany(); },

  async update(id: string, obj: Omit<Service, 'id'>): Promise<Service> {
    return prisma.service.update({
      data: { ...obj },
      where: { id }
    });
  },

  async destroy(id: string): Promise<void> {
    await prisma.service.delete({
      where: {
        id
      }
    });
  }
};