import { Response } from "express";
import {
  setCookie,
  deleteRefreshTokenCookie,
  setRefreshTokenCookie,
} from "../../../src/utils/cookies";
import { createMockResponse } from "../../helpers/factories/express.factory";
import { REFRESH_TOKEN_EXP } from "../../../src/config/envVariables";
import ms from "ms";

describe("CookiesUtil", () => {
  let res: Response;
  let spies: ReturnType<typeof createMockResponse>["spies"];

  beforeEach(() => {
    const mock = createMockResponse();
    res = mock.res;
    spies = mock.spies;
  });

  it("Should set the cookie", () => {
    setCookie(res, "some-key", "some-value", 3600);

    expect(spies.cookie).toHaveBeenCalledWith(
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

  it("Should set refresh token", () => {
    setRefreshTokenCookie(res, "my-token!");

    expect(spies.cookie).toHaveBeenCalledWith(
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

  it("Should delete refresh token", () => {
    deleteRefreshTokenCookie(res);

    expect(spies.cookie).toHaveBeenCalledWith(
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
