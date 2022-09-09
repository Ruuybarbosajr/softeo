import { InstallmentsServiceProvided } from '@prisma/client';
import IServiceProvided from '../interfaces/IServiceProvided';

interface IInstallmentsServiceProvided {
  serviceProvided: IServiceProvided & {
    installmentsServiceProvided: (InstallmentsServiceProvided & {
      serviceProvided: {
        client: {
          name: string
        },
        service: {
          name: string
        }
      }
    })[]
  }
}

export default IInstallmentsServiceProvided;