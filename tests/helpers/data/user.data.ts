import { Role, User } from "@prisma/client";

export const sampleUserInput: Omit<
  User,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> = {
  username: "testuser",
  name: "Test User",
  password: "plaintextpassword",
  role: Role.ADMIN,
};

export const sampleUser: User = {
  ...sampleUserInput,
  id: 1,
  password: "hashedpassword",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};
