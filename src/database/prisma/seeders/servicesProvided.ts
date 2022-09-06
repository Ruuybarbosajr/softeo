import { ServiceProvided } from '@prisma/client';
import { prisma } from '../../cliente';

async function main() {
  const servicesProvided: ServiceProvided[] = [
    {
      id: '99b049c6-bcdb-46b9-b248-a5737f170adf',
      clientId: '197c7ac9-1054-44c1-909b-725a0fc14454',
      serviceId: 'a117e1c7-23db-4f2d-912f-6822c2c35d1d',
      installmentsContracted: 3,
      installmentsPaid: 1,
      createdAt: new Date(2022, 1, 6),
      obs: '',
    },
    {
      id: '0e2151e4-5bc8-48b7-ad4f-8d917a7ec367',
      clientId: 'e64dd530-12fc-4002-92de-f2a27a9ccd8e',
      serviceId: '45905a74-50f4-4176-9a51-3e558bc9b293',
      installmentsContracted: 3,
      installmentsPaid: 1,
      createdAt: new Date(2022, 1, 6),
      obs: '',
    },
    {
      id: 'ad5fc04a-4a61-471d-a94b-f54ec915526d',
      clientId: '333a9138-b6f2-467f-ba40-ee7158ea50fb',
      serviceId: '94c14538-eea9-4d76-b97c-4106220fb848',
      installmentsContracted: 2,
      installmentsPaid: 2,
      createdAt: new Date(2022, 2, 16),
      obs: '',
    },
    {
      id: 'ccedec00-bd33-4606-8a7f-5de43236e16f',
      clientId: 'c1637f02-db68-47c5-aade-2a6cff376ba5',
      serviceId: '6ad4043c-0dea-43a5-9019-67664ed23d6b',
      installmentsContracted: 5,
      installmentsPaid: 1,
      createdAt: new Date(2022, 2, 18),
      obs: '',
    },
    {
      id: '941d62f8-bb94-4d10-81b0-50afceecc21e',
      clientId: '7a03750c-b14d-48d4-aca8-13b30dc5bf86',
      serviceId: 'e1bb6240-7ddc-4e91-97fc-8ef38a70243d',
      installmentsContracted: 3,
      installmentsPaid: 2,
      createdAt: new Date(2022, 3, 2),
      obs: '',
    },
    {
      id: '3fd891d3-6bfd-4785-849a-f13b4eedb7a1',
      clientId: '7a03750c-b14d-48d4-aca8-13b30dc5bf86',
      serviceId: '054d1966-7795-446e-a3d5-107cbbe465d3',
      installmentsContracted: 3,
      installmentsPaid: 1,
      createdAt: new Date(2022, 5, 15),
      obs: '',
    },
  ];

  for (const ServiceProvided of servicesProvided) {
    await prisma.serviceProvided.create({
      data: { ...ServiceProvided },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });