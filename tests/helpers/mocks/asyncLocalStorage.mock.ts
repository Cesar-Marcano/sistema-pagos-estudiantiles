import {
  getUserId,
  runWithUserContext,
} from "../../../src/utils/asyncLocalStorage";

jest.mock("../../../src/utils/asyncLocalStorage", () => ({
  getUserId: jest.fn().mockReturnValue(1),
  runWithUserContext: jest.fn(),
}));

export const getUserIdMock = getUserId as jest.MockedFn<typeof getUserId>;
export const runWithUserContextMock = runWithUserContext as jest.MockedFn<
  typeof runWithUserContext
>;
