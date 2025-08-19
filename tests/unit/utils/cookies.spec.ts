import { Response } from "express";
import {
  setCookie,
  deleteRefreshTokenCookie,
  setRefreshTokenCookie,
} from "../../../src/shared/utils/cookies";
import { createMockResponse } from "../../helpers/factories/express.factory";
import { REFRESH_TOKEN_EXP } from "../../../src/config/envVariables";
import ms from "ms";

describe("CookiesUtil", () => {
  let res: Response;

  beforeEach(() => {
    res = createMockResponse();
  });

  it("should set the cookie", () => {
    setCookie(res, "some-key", "some-value", 3600);

    expect(res.cookie).toHaveBeenCalledWith(
      "some-key",
      "some-value",
      expect.objectContaining({
        httpOnly: true,
        sameSite: "strict",
        secure: expect.any(Boolean),
        maxAge: 3600,
      })
    );
  });

  it("should set refresh token", () => {
    setRefreshTokenCookie(res, "my-token!");

    expect(res.cookie).toHaveBeenCalledWith(
      "refreshToken",
      "my-token!",
      expect.objectContaining({
        httpOnly: true,
        sameSite: "strict",
        secure: expect.any(Boolean),
        maxAge: ms(REFRESH_TOKEN_EXP),
      })
    );
  });

  it("should delete refresh token", () => {
    deleteRefreshTokenCookie(res);

    expect(res.cookie).toHaveBeenCalledWith(
      "refreshToken",
      "",
      expect.objectContaining({
        httpOnly: true,
        sameSite: "strict",
        secure: expect.any(Boolean),
        maxAge: 0,
      })
    );
  });
});
