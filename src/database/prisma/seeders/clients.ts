import { Client } from '@prisma/client';
import { prisma } from '../../cliente';

async function main() {
  const clients: Client[] = [
    {
      id: '197c7ac9-1054-44c1-909b-725a0fc14454',
      name: 'Adrian Martins Fadiga',
      email: 'adrianmfadiga@gmail.com',
      tel: '48991536458'
    },
    {
      id: 'e64dd530-12fc-4002-92de-f2a27a9ccd8e',
      name: 'Matheus Ferreira Vitor de Araújo',
      email: 'm.ferreira.araujo2016@gmail.com',
      tel: '21995456387'
    },
    {
      id: '333a9138-b6f2-467f-ba40-ee7158ea50fb',
      name: 'Bianca Louzada Silveira Fernandes',
      email: 'biancafernandes12@hotmail.com',
      tel: '33983561248'
    },
    {
      id: 'c1637f02-db68-47c5-aade-2a6cff376ba5',
      name: 'Jeffersom Almeira Eller',
      email: 'jeffimalmeida@gmail.com',
      tel: '33987002546'
    },
    {
      id: '7a03750c-b14d-48d4-aca8-13b30dc5bf86',
      name: 'Lívia Maria Quintão de Assis',
      email: 'livia-assis1@hotmail.com',
      tel: '31988754563'
    }
  ];

  for (const client of clients) {
    await prisma.client.create({
      data: { ...client },
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