import { PrismaClient } from "@prisma/client";

export function createMockPrisma(
  models: (keyof PrismaClient)[],
  modelOverrides: Partial<Record<keyof PrismaClient, any>> = {}
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
      count: jest.fn(),
    };
  });

  for (const [modelName, override] of Object.entries(modelOverrides)) {
    mock[modelName] = {
      ...mock[modelName],
      ...override,
    };
  }

  return mock as unknown as PrismaClient;
}
