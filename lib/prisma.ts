import { PrismaClient } from '@prisma/client';
import { PrismaClient as PrismaClientMongo } from '@prisma/mongoclient';

let prisma: PrismaClient;
let prismaMongo: PrismaClientMongo;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
  prismaMongo = new PrismaClientMongo();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;

  if (!global.prismaMongo) {
    global.prismaMongo = new PrismaClientMongo();
  }
  prismaMongo = global.prismaMongo;
}

export { prisma, prismaMongo };

export default prisma;
