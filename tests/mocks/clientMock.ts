import { Client } from '@prisma/client';
import IClient from '../../src/interfaces/IClient';
import INewClient from '../../src/interfaces/INewClient';

export const newClientMock: INewClient = {
  name: 'Jubileu',
  email: 'judiscleisson@gmail.com',
  tel: '2199157171'
}

export const clientMock: IClient = {
  id: '197c7ac9-1054-44c1-909b-725a0fc14454',
  name: 'Jubileu',
  email: 'judiscleisson@gmail.com',
  tel: '2199157171',
  services: [
    {
      id: '197boac9-1054-44c1-909b-725a0fc14454',
      serviceId: '197c7ac9-1054-44c1-909b-725a0fc14454',
      installmentsContracted: 5,
      installmentsPaid: 1,
      createdAt: new Date(2022, 1, 15),
      obs: ''
    }
  ]
}

export const clientUpdatedMock: Client = {
  id: '197c7ac9-1054-44c1-909b-725a0fc14454',
  name: 'Ju Ju bileu',
  email: 'judiscleisson@gmail.com',
  tel: '21999194372'
}

export const clientUpdateMock: Omit<Client, 'id'> = {
  name: 'Ju Ju bileu',
  email: 'judiscleisson@gmail.com',
  tel: '21999194372'
}

export const allClientMock: IClient[] = [
  {
    id: '197c7ac9-1054-44c1-909b-725a0fc14454',
    name: 'Jubileu',
    email: 'judiscleisson@gmail.com',
    tel: '2199157171',
    services: [
      {
        id: '197boac9-1054-44c1-909b-725a0fc14454',
        serviceId: '197c7ac9-1054-44c1-909b-725a0fc14454',
        installmentsContracted: 5,
        installmentsPaid: 1,
        createdAt: new Date(2022, 1, 15),
        obs: ''
      }
    ]
  },
  {
    id: '197c7ac9-1054-44c1-909b-725a0fc14454',
    name: 'Xablau',
    email: 'xablau@gmail.com',
    tel: '21988654712',
    services: [
      {
        id: '197boac9-1054-44c1-909b-725a0fc14454',
        serviceId: '197c7ac9-1054-44c1-909b-725a0fc14454',
        installmentsContracted: 5,
        installmentsPaid: 1,
        createdAt: new Date(2022, 1, 15),
        obs: ''
      }
    ]
  }
]