import { PrismaClient } from "@prisma/client";

type AnyMock = jest.Mock<any, any>;
type MockedModel = Record<string, AnyMock>;

export type MockedPrismaClient = Partial<
  Record<keyof PrismaClient, MockedModel>
> & {
  $connect: AnyMock;
  $disconnect: AnyMock;
  $on: AnyMock;
  $transaction: AnyMock;
  $use: AnyMock;
};

export function createMockPrisma(
  models: (keyof PrismaClient)[]
): MockedPrismaClient {
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

  return mock as MockedPrismaClient;
}
