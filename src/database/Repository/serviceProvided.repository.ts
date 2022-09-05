import { Prisma  } from '@prisma/client';
import INewServiceProvided from '../../interfaces/INewServiceProvided';
import IServiceProvided from '../../interfaces/IServiceProvided';
import IUpdateServiceProvided from '../../interfaces/IUpdateServiceProvided';
import { prisma } from '../cliente';

const SELECT_QUERY = {
  id: true,
  client: true,
  service: true,
  installmentsContracted: true,
  installmentsPaid: true,
  createdAt: true,
  obs: true
};

export default {
  async readAll(config: Prisma.ServiceProvidedWhereInput ): Promise<IServiceProvided[]> { 
    return prisma.serviceProvided.findMany(
      { where: {...config }, select: { ...SELECT_QUERY } }
    );
  },

  async readOne(id: string): Promise<IServiceProvided | null> {
    return prisma.serviceProvided.findUnique({
      where: {
        id
      },
      select: { ...SELECT_QUERY }
    });
  },

  async create(obj:  INewServiceProvided): Promise<IServiceProvided> {
    return prisma.serviceProvided.create({
      data: { ...obj },
      select: { ...SELECT_QUERY }
    });
  },

  async update(
    id: string,
    obj: IUpdateServiceProvided
  ): Promise<IServiceProvided> {
    return prisma.serviceProvided.update({
      where: {
        id
      },
      data: { ...obj },
      select: { ...SELECT_QUERY }
    });
  },

  async destroy(id: string): Promise<void> {
    await prisma.serviceProvided.delete({
      where: {
        id
      }
    });
  }
};