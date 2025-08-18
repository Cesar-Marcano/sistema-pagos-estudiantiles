import { Role } from "@prisma/client";

export interface RawUserPayload {
  name: string;
  role: Role;
  username: string;
  id: number;
}

export interface UserPayload extends RawUserPayload {
  jti: string;
}
