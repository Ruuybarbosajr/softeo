import { Service } from '@prisma/client';

type INewService = Omit<Service, 'id'>

export default INewService;