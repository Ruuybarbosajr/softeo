import { Client } from '@prisma/client';
import INewClient from '../../src/interfaces/INewClient';

export const newClientMock: INewClient = {
  name: 'Jubileu',
  email: 'judiscleisson@gmail.com',
  tel: '2199157171'
}

export const clientMock: Client = {
  id: '197c7ac9-1054-44c1-909b-725a0fc14454',
  name: 'Jubileu',
  email: 'judiscleisson@gmail.com',
  tel: '2199157171'
}

export const clientUpdatedMock: Client = {
  id: '197c7ac9-1054-44c1-909b-725a0fc14454',
  name: 'Ju Ju bileu',
  email: 'judiscleisson@gmail.com',
  tel: '21999194372'
}

export const allClientMock: Client[] = [
  {
    id: '197c7ac9-1054-44c1-909b-725a0fc14454',
    name: 'Jubileu',
    email: 'judiscleisson@gmail.com',
    tel: '2199157171'
  },
  {
    id: '197c7ac9-1054-44c1-909b-725a0fc14454',
    name: 'Xablau',
    email: 'xablau@gmail.com',
    tel: '21988654712'
  }
]