import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXP,
  getEnv,
  REFRESH_TOKEN_EXP,
} from "../config/envVariables";

export interface UserPayload {
  name: string;
  role: Role;
  username: string;
  id: number;
}

export class AuthService {
  constructor() {}

  private refreshSecret = getEnv("JWT_REFRESH", "super-secret-refresh");
  private accessSecret = getEnv("JWT_ACCESS", "super-secret-access");

  public retrieveRefreshToken(user: UserPayload) {
    return jwt.sign(user, this.refreshSecret, {
      expiresIn: REFRESH_TOKEN_EXP,
    });
  }

  public decodeRefreshToken(token: string) {
    const payload = jwt.verify(token, this.refreshSecret);

    return payload as UserPayload;
  }

  public retrieveAccessToken(user: UserPayload) {
    return jwt.sign(user, this.accessSecret, {
      expiresIn: ACCESS_TOKEN_EXP,
    });
  }

  public decodeAccessToken(token: string) {
    const payload = jwt.verify(token, this.accessSecret);

    return payload as UserPayload;
  }
}
