export const createIHasherServiceMock = () => ({
  compare: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue("hashedPassword"),
});
