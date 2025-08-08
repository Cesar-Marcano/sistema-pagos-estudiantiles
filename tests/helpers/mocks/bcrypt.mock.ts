export const bcryptMock = {
  genSalt: jest.fn().mockResolvedValue("salt"),
  hash: jest.fn().mockResolvedValue("hashedpassword"),
  compare: jest.fn().mockResolvedValue(true),
};

jest.mock("bcryptjs", () => bcryptMock);
