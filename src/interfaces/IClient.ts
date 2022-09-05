import { Client, ServiceProvided } from '@prisma/client';

type IClient = Client & {
  services: Omit<ServiceProvided, 'clientId'>[]
}

export default IClient;