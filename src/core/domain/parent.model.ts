import { RequireAtLeastOne } from "../../utils/types/common-types";
import { User } from "./user.model";

interface BaseParent {
  id: number;
  fullname: string;
  document: string;
  phoneNumber?: string;
  email?: string;

  createdBy: number | User;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type Parent = RequireAtLeastOne<BaseParent, "phoneNumber" | "email">;
