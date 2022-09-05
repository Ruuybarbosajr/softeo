import { Client, Service, ServiceProvided } from '@prisma/client';

type IServiceProvided = Omit<ServiceProvided, 'clientId' | 'serviceId' > & {
  client: Client
  service: Service
}

export default IServiceProvided;