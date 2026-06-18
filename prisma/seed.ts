import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'

const prisma = new PrismaClient({ datasourceUrl: process.env['DATABASE_URL'] })

async function main() {
  const user = await prisma.user.upsert({
    where: { id: 'default-user' },
    update: {},
    create: {
      id: 'default-user',
      name: 'Ali Naqi',
      email: 'alinaqi1129@gmail.com',
    },
  })
  console.log('Seeded default user:', user.name, `(${user.email})`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
