import { Response } from "express";
import ms from "ms";
import { REFRESH_TOKEN_EXP, isDevelopment } from "../../config/envVariables";

export function setCookie(
  res: Response,
  name: string,
  content: string,
  maxAge: number
) {
  res.cookie(name, content, {
    httpOnly: true,
    secure: !isDevelopment(),
    sameSite: "strict",
    maxAge,
  });
}

export function setRefreshTokenCookie(res: Response, token: string) {
  setCookie(res, "refreshToken", token, ms(REFRESH_TOKEN_EXP));
}

export function deleteRefreshTokenCookie(res: Response) {
  setCookie(res, "refreshToken", "", 0);
}
