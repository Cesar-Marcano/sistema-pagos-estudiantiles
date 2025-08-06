import { Response } from "express";
import ms from "ms";
import { REFRESH_TOKEN_EXP, isDevelopment } from "../config/envVariables";

export function setRefreshTokenCookie(res: Response, token: string) {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: !isDevelopment(),
    sameSite: "strict",
    maxAge: ms(REFRESH_TOKEN_EXP),
  });
}

export function deleteRefreshTokenCookie(res: Response) {
  res.cookie("refreshToken", "", {
    httpOnly: true,
    secure: !isDevelopment(),
    sameSite: "strict",
    maxAge: 0,
  });
}
