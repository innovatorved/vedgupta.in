const { PrismaClient } = require('@prisma/client');
const sha256 = require('crypto-js/sha256');

const prismaClient = new PrismaClient();

const hashPassword = (password) => {
  return sha256(password).toString();
};

const Role = {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'innovatorved@tech';

const user = {
  name: 'Ved Gupta',
  email: 'me@vedgupta.in',
  password: hashPassword(ADMIN_PASSWORD),
  role: Role.ADMIN,
  emailVerified: new Date()
};

async function seed() {
  console.log('Start seeding ...');
  try {
    await prismaClient.user.upsert({
      where: { email: user.email },
      update: {},
      create: user
    });
    console.log(`Created user with email: ${user.email}`);
  } catch (error) {
    console.error(`Error creating user with email: ${user.email}`, error);
  }
  console.log('Seeding finished.');
}

seed()
  .catch((error) => {
    console.error('Error seeding database:', error);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
