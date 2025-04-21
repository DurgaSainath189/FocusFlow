import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient;
// }

// let prisma: PrismaClient;

// if (!global.prisma) {
//   global.prisma = new PrismaClient();
// }
// prisma = global.prisma;

// export const db = prisma;


// import { PrismaClient } from '@/generated/prisma-client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export const db = prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
