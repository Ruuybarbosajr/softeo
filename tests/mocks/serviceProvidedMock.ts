import INewServiceProvided from '../../src/interfaces/INewServiceProvided';
import IServiceProvided from '../../src/interfaces/IServiceProvided';

export const serviceProvidedMock: IServiceProvided = {
  id: 'sadsadasd',
  client: {
    id: '197c7ac9-1054-44c1-909b-725a0fc14454',
    name: 'Jubileu',
    email: 'judiscleisson@gmail.com',
    tel: '2199157171'
  },
  service: {
    id: '197c7ac9-1054-44c1-909b-725a0fc14454',
    name: 'Limpeza',
    price: 180.00,
    maxInstallments: 5,
  },
  installmentsContracted: 5,
  installmentsPaid: 1,
  createdAt: new Date(2022, 8, 30),
  obs: ''
}

export const newServiceProvidedMock: INewServiceProvided = {
  clientId: '197c7ac9-1054-44c1-909b-725a0fc14454',
  serviceId: '197c7ac9-1054-44c1-909b-725a0fc14454',
  installmentsContracted: 5,
  installmentsPaid: 1,
  obs: ''
}