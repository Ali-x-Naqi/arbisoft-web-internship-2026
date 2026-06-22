import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaLibSql({
  url: process.env['DATABASE_URL'] ?? 'file:./dev.db',
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { id: 'default-user' },
    update: { password },
    create: {
      id: 'default-user',
      name: 'Ali Naqi',
      email: 'alinaqi1129@gmail.com',
      password,
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
