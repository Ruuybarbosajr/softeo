import { Client } from '@prisma/client';

type INewClient = Omit<Client, 'id'>

export default INewClient;