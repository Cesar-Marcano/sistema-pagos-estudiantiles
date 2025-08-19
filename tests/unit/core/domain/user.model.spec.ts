import { User } from "../../../../src/core/domain/user.model";
import { IHasherService } from "../../../../src/core/ports/out/services/hasher.service.port";
import {
  sampleUserData,
  testDbUser,
  testNewUser,
} from "../../../helpers/data/user";
import { createIHasherServiceMock } from "../../../helpers/mocks/hasher.service.mock";

describe("User model", () => {
  let iHasherServiceMock: IHasherService;
  let user: User;
  let userFromDB: User;

  beforeEach(async () => {
    iHasherServiceMock = createIHasherServiceMock();

    user = await testNewUser(iHasherServiceMock);
    userFromDB = testDbUser();
  });

  describe("User creation", () => {
    it("should create a new user with correct default properties", () => {
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBe(user.createdAt);
      expect(user.deletedAt).toBeNull();
    });
  });

  describe("Password handling", () => {
    it("should return true when comparing a correct password", async () => {
      const isCorrect = await user.comparePassword(
        sampleUserData.password,
        iHasherServiceMock
      );
      expect(isCorrect).toBeTruthy();
      expect(iHasherServiceMock.compare).toHaveBeenCalledWith(
        sampleUserData.password,
        "hashedPassword"
      );
    });

    it("should return false when comparing an incorrect password", async () => {
      const incorrectHasherServiceMock = {
        ...iHasherServiceMock,
        compare: jest.fn().mockResolvedValue(false),
      };

      const isCorrect = await user.comparePassword(
        "thisIsNotMyPassword0!",
        incorrectHasherServiceMock
      );
      expect(isCorrect).toBeFalsy();
      expect(incorrectHasherServiceMock.compare).toHaveBeenCalledWith(
        "thisIsNotMyPassword0!",
        "hashedPassword"
      );
    });
  });

  describe("Property access", () => {
    it("should not have a public 'password' getter to avoid exposing the value", () => {
      const descriptor = Object.getOwnPropertyDescriptor(
        User.prototype,
        "password"
      );
      expect(descriptor).toBeUndefined();
    });
  });
});
