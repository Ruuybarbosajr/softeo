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

export const allServiceMock: Service[] = [
  {
    id: '197c7ac9-1054-44c1-909b-725a0fc14454',
    name: 'Limpeza',
    price: 180.00,
    maxInstallments: 3,
  },
  {
    id: '197c7ac9-1054-44c1-909b-725a0fc14455',
    name: 'Exodontia',
    price: 300.00,
    maxInstallments: 5,
  }
]

export const serviceUpdatedMock: Service = {
  id: '197c7ac9-1054-44c1-909b-725a0fc14454',
  name: 'Limpeza',
  price: 200.00,
  maxInstallments: 6,
}

export const serviceUpdateMock: Omit<Service, 'id'> = {
  name: 'Limpeza',
  price: 200.00,
  maxInstallments: 6,
}