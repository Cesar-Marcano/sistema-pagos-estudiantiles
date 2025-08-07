import { Parent } from "@prisma/client";

export const sampleParentInput: Omit<
  Parent,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> = {
  document: "V-12345678",
  email: "foo@bar.com",
  fullname: "John Foo Doe Bar",
  phoneNumber: "012345678",
  userId: 1,
};

export const sampleParent: Parent = {
    ...sampleParentInput,
    createdAt: new Date(),
    deletedAt: null,
    id: 1,
    updatedAt: new Date(),
}
