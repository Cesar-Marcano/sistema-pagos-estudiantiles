import { Username } from "../../../../src/core/datavalues/username.datavalue";
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

    it("should change the password", async () => {
      const newPassword = "newSecurePassword123!";
      const newHashedPassword = "newHashedPassword123";

      const changePasswordHasherServiceMock = {
        ...iHasherServiceMock,
        hash: jest.fn().mockImplementation((password, hashedPassword) => {
          return (
            password === newPassword && hashedPassword === newHashedPassword
          );
        }),
      };

      await user.changePassword(newPassword, changePasswordHasherServiceMock);
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

  describe("User from DB", () => {
    it("should have db data", () => {
      expect(userFromDB.id).not.toBeUndefined();
      expect(userFromDB.id).toBe(1);
      expect(userFromDB.createdAt).toBeInstanceOf(Date);
      expect(userFromDB.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe("Content updates", () => {
    it("should change the username", () => {
      const newUsername = new Username("my.new.username");

      user.updateUsername(newUsername);

      expect(user.username).toBe(newUsername);
    });
  });
});
