import 'dotenv/config';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaLibSql({
  url: process.env['DATABASE_URL'] ?? 'file:./dev.db',
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.upsert({
    where: { id: 'default-user' },
    update: {},
    create: {
      id: 'default-user',
      name: 'Ali Naqi',
      email: 'alinaqi1129@gmail.com',
    },
  });
  console.log('Seeded default user:', user.name, `(${user.email})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
