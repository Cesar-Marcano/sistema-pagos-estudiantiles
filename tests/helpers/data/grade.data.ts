import { Grade } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export const sampleGradeInput: Omit<
  Grade,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> = {
  description: "hello",
  fee: Decimal(12.0),
  hasLevels: false,
  maxLevel: 0,
  name: "Hello world",
  userId: 1,
};

export const sampleGrade: Grade = {
  ...sampleGradeInput,
  createdAt: new Date(),
  deletedAt: null,
  updatedAt: new Date(),
  id: 1,
};

export const updatedSampleGrade: Grade = {
  ...sampleGrade,
  name: "Foo Bar",
};
