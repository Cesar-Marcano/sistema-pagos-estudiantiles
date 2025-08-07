import { PrismaClient } from "@prisma/client";

export function createMockPrisma(
  models: (keyof PrismaClient)[]
): PrismaClient {
  const base = {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    $on: jest.fn(),
    $transaction: jest.fn(),
    $use: jest.fn(),
  };

  const mock: any = { ...base };

  models.forEach((modelName) => {
    mock[modelName] = {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      upsert: jest.fn(),
    };
  });

  return mock as unknown as PrismaClient;
}
