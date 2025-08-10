import { Role } from "@prisma/client";

export interface User {
  id: number;
  role: number | Role;
  username: string;
  name: string;
  password: string;
  email: string;

  createdBy: number | User;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
