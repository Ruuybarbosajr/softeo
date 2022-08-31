import { Admin } from '@prisma/client';

type IPayload = Omit<Admin, 'password'>

export default IPayload;