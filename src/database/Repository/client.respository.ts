import { Client } from '@prisma/client';
import INewClient from '../../interfaces/INewClient';
import { prisma } from '../cliente';

export default {
  async readOne(field: string): Promise<Client | null> {
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
      }
    });
  },

  async create(newClient: INewClient): Promise<Client> {
    return prisma.client.create({
      data: newClient
    });
  },

  async readAll(): Promise<Client[]> { return prisma.client.findMany(); },

  async update(id: string, obj: Omit<Client, 'id'>): Promise<Client> {
    return prisma.client.update({
      data: obj,
      where: { id }
    });
  }
};