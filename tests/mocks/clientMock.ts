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