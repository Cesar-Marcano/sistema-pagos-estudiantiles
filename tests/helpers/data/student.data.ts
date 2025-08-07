import { Student } from "@prisma/client";

export const sampleStudentInput: Omit<
  Student,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> = {
  birthday: new Date(),
  document: null,
  fullname: "Foo Bar Junior",
  gradeId: 1,
  gradeLevel: null,
  parentId: 1,
  section: "A",
  status: "ACTIVE",
  userId: 1,
};

export const sampleStudent: Student = {
  ...sampleStudentInput,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  id: 1,
};

export const updatedSampleStudent: Student = {
  ...sampleStudent,
  fullname: "Andres Foo Bar",
};

export const deletedSampleStudent: Student = {
  ...sampleStudent,
  deletedAt: new Date(),
};
