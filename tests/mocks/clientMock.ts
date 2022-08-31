import { Client } from '@prisma/client';
import INewClient from '../../src/interfaces/INewClient';

export const newClientMock: INewClient = {
  name: 'Jubileu',
  email: 'judiscleisson@gmail.com',
  tel: '2199157171'
}

export const newClientCreatedMock: Client = {
  id: 'idvalido',
  name: 'Jubileu',
  email: 'judiscleisson@gmail.com',
  tel: '2199157171'
}