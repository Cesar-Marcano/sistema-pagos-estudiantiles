import { User } from "./user.model";

export interface Session {
  id: number;
  jti: string;
  user: number | User;

  createdAt: Date;
}
