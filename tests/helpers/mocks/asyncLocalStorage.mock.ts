import {
  getUserId,
  runWithUserContext,
} from "../../../src/shared/utils/asyncLocalStorage";

jest.mock("../../../src/shared/utils/asyncLocalStorage", () => ({
  getUserId: jest.fn().mockReturnValue(1),
  runWithUserContext: jest.fn((_, next) => {
    next();
  }),
}));

export const getUserIdMock = getUserId as jest.MockedFn<typeof getUserId>;
export const runWithUserContextMock = runWithUserContext as jest.MockedFn<
  typeof runWithUserContext
>;
