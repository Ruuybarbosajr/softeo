import { Admin } from '@prisma/client';
import ILogin from '../../interfaces/ILogin';
import { prisma } from '../cliente';

export default {
  async execute({ username }: ILogin): Promise<Admin | null> {
    return prisma.admin.findUnique({ where: { username }});
  }
};