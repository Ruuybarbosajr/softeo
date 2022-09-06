import { Admin } from '@prisma/client';
import { prisma } from '../../cliente';

async function main() {
  const admin: Admin = {
    id: 'e2a3d8ae-81df-4600-b4d2-5d0fc8867e0b',
    username: 'erica',
    password: 'senhapadrao'
  };

  await prisma.admin.create({
    data: { ...admin },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });