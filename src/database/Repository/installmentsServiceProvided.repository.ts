import { prisma } from '../cliente';
import { InstallmentsServiceProvided, Prisma } from '@prisma/client';
import IInstallmentsServiceProvided from '../../interfaces/IInstallmentsServiceProvided';

export default {
  // async readOne(id: string) {
  //   return prisma.service.findUnique({
  //     where: {
  //       id
  //     }
  //   });
  // },

  async create(arr: InstallmentsServiceProvided[]) {
    return prisma.installmentsServiceProvided.createMany({
      data: [...arr]
    });
  },

  async readAll(config: Prisma.InstallmentsServiceProvidedWhereInput ): 
  Promise<IInstallmentsServiceProvided[]> { 
    return prisma.installmentsServiceProvided.findMany(
      { 
        where: {...config },
        distinct: Prisma.InstallmentsServiceProvidedScalarFieldEnum.serviceProvidedId,
        select: {
          serviceProvided: {
            select: {
              id: true,
              client: true,
              service: true,
              installmentsContracted: true,
              installmentsPaid: true,
              createdAt: true,
              obs: true,
              installmentsServiceProvided: {
                where: { ...config },
                select: {
                  dateInstallment: true,
                  numberInstallment: true,
                  priceInstallment: true,
                  serviceProvidedId: true,
                  serviceProvided: {
                    select: {
                      client: {
                        select: {
                          name: true
                        }
                      },
                      service: {
                        select: {
                          name: true
                        }
                      },
                    }
                  }
                }
              }
            }
          }
        }
      }
    );
  },

  // async update(id: string, obj: Omit<Service, 'id'>): Promise<Service> {
  //   return prisma.service.update({
  //     data: { ...obj },
  //     where: { id }
  //   });
  // },

  // async destroy(id: string): Promise<void> {
  //   await prisma.service.delete({
  //     where: {
  //       id
  //     }
  //   });
  // }
};