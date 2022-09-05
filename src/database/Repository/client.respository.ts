import { Client } from '@prisma/client';
import IClient from '../../interfaces/IClient';
import INewClient from '../../interfaces/INewClient';
import { prisma } from '../cliente';

const SELECT_QUERY = {
  id: true,
  serviceId: true,
  installmentsContracted: true,
  installmentsPaid: true,
  createdAt: true,
  obs: true
};

export default {
  async readOne(field: string): Promise<IClient | null> {
    return prisma.client.findFirst({
      where: {
        OR: [
          {
            email: field
          },
          {
            id: field
          },
        ],
      },
      include: {
        services: { 
          select: {...SELECT_QUERY }
        }
      }
    });
  },

  async create(obj: INewClient): Promise<Client> {
    return prisma.client.create({
      data: { ...obj }
    });
  },

  async readAll(): Promise<IClient[]> { return prisma.client.findMany({
    include: {
      services: { 
        select: {...SELECT_QUERY }
      }
    }
  }); },

  async update(id: string, obj: Omit<Client, 'id'>): Promise<Client> {
    return prisma.client.update({
      data: { ...obj },
      where: { id }
    });
  },

  async destroy(id: string): Promise<void> {
    await prisma.client.delete({
      where: {
        id
      }
    });
  }
};