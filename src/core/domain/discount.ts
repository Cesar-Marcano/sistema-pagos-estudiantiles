import { User } from "./user.model";

export interface Discount {
  id: number;
  name: string;
  description?: string;
  value: number;
  isPercentage: boolean;

  createdBy: number | User;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
