import { Service } from '@prisma/client'
import INewService from '../../src/interfaces/INewService'

export const serviceMock: Service = {
  id: '197c7ac9-1054-44c1-909b-725a0fc14454',
  name: 'Limpeza',
  price: 180.00,
  maxInstallments: 5,
}

export const newServiceMock: INewService = {
  name: 'Limpeza',
  price: 180.00,
  maxInstallments: 5,
}