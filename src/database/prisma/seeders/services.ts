import { Service } from '@prisma/client';
import { prisma } from '../../cliente';

async function main() {
  const services: Service[] = [
    {
      id: 'a117e1c7-23db-4f2d-912f-6822c2c35d1d',
      name: 'Limpeza',
      price: 180.00,
      maxInstallments: 5,
    },
    {
      id: '94c14538-eea9-4d76-b97c-4106220fb848',
      name: 'Raspagem supra gengival',
      price: 150.00,
      maxInstallments: 3,
    },
    {
      id: '45905a74-50f4-4176-9a51-3e558bc9b293',
      name: 'Pulpectomia',
      price: 150.00,
      maxInstallments: 3,
    },
    {
      id: 'e1bb6240-7ddc-4e91-97fc-8ef38a70243d',
      name: 'Restauração em ionômero de vidro classe I',
      price: 120.00,
      maxInstallments: 3,
    },
    {
      id: '6ad4043c-0dea-43a5-9019-67664ed23d6b',
      name: 'Clareamento dental',
      price: 500.00,
      maxInstallments: 8,
    },
    {
      id: '054d1966-7795-446e-a3d5-107cbbe465d3',
      name: 'Exodontia de terceiro molar inferior',
      price: 300.00,
      maxInstallments: 6,
    }
  ];

  for (const service of services) {
    await prisma.service.create({
      data: { ...service },
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