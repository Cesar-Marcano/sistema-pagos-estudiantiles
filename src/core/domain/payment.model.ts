import { User } from "./user.model";

export interface PaymentMethod {
  id: number;
  name: string;
  description?: string;
  requiresManualVerification: boolean;
  requiresReferenceNumber: boolean;

  createdBy: number | User;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
