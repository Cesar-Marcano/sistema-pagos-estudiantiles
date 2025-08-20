import {
  getUserId,
  runWithUserContext,
} from "../../../src/shared/utils/asyncLocalStorage";

describe("UserContext", () => {
  it("should return the userId within the context", () => {
    runWithUserContext(123, () => {
      const userId = getUserId();

      expect(userId).toBe(123);
    });
  });

  it("should return undefined outside of context", () => {
    const userId = getUserId();

    expect(userId).toBeUndefined();
  });
});
