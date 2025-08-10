import "../../helpers/mocks/asyncLocalStorage.mock";
import { bcryptMock } from "../../helpers/mocks/bcrypt.mock";
import { PrismaClient } from "@prisma/client";
import { createMockPrisma } from "../../helpers/factories/prisma.factory";
import { UserService } from "../../../src/services/user.service";
import { auditLogsServiceMock } from "../../helpers/mocks/auditLogsService.mock";
import { sampleUser, sampleUserInput } from "../../helpers/data/user.data";
import { BadRequestError } from "../../../src/errors/badRequest.error";
import { expectAuditLogCalledWith } from "../../helpers/assertions/auditLogs.assertions";
import { AuditLogService } from "../../../src/services/auditLog.service";

describe("UserService", () => {
  let prisma: PrismaClient;
  let auditLogsService: AuditLogService;
  let userService: UserService;

  beforeEach(() => {
    prisma = createMockPrisma(["user"], {
      user: {
        create: jest.fn().mockResolvedValue(sampleUser),
        findFirst: jest.fn().mockResolvedValue(sampleUser),
        count: jest.fn().mockResolvedValue(0),
      },
    });
    auditLogsService = auditLogsServiceMock();
    userService = new UserService(prisma, auditLogsService);
  });

  it("should create a user", async () => {
    const user = await userService.createUser(sampleUserInput);

    expectAuditLogCalledWith(auditLogsService, "CREATE", "User", 1);
    expect(user).toEqual(
      expect.objectContaining({
        id: sampleUser.id,
        username: sampleUser.username,
      })
    );
    expect(prisma.user.create).toHaveBeenCalled();
    expect(bcryptMock.hash).toHaveBeenCalledWith(
      sampleUserInput.password,
      "salt"
    );
  });

  it("should get user login info", async () => {
    const user = await userService.getUserLoginInfo(sampleUser.username);

    expect(user).toEqual(sampleUser);
    expect(prisma.user.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          username: sampleUser.username,
          deletedAt: null,
        }),
      })
    );
  });

  it("should throw when user login info not found", async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

    await expect(userService.getUserLoginInfo("nouser")).rejects.toThrow(
      BadRequestError
    );
  });

  it("should login a user", async () => {
    const user = await userService.loginUser(
      sampleUser.username,
      "plaintextpassword"
    );

    expect(bcryptMock.compare).toHaveBeenCalledWith(
      "plaintextpassword",
      sampleUser.password
    );
    expect(user).toEqual(
      expect.objectContaining({
        id: sampleUser.id,
      })
    );
  });

  it("should throw when password is incorrect", async () => {
    bcryptMock.compare.mockResolvedValueOnce(false);

    await expect(
      userService.loginUser(sampleUser.username, "wrongpassword")
    ).rejects.toThrow(BadRequestError);
  });

  it("should return true if admin exists", async () => {
    (prisma.user.count as jest.Mock).mockResolvedValue(1);

    expect(await userService.adminExists()).toBe(true);
  });

  it("should create superuser when no admin exists", async () => {
    (prisma.user.create as jest.Mock) = jest
      .fn()
      .mockResolvedValue({ ...sampleUser, username: "admin" });

    const user = await userService.createSuperuser("admin", "pass", "Admin");

    expect(user).toEqual(expect.objectContaining({ username: "admin" }));
    expect(prisma.user.create).toHaveBeenCalled();
  });

  it("should throw when superuser already exists", async () => {
    (prisma.user.count as jest.Mock).mockResolvedValue(1);

    await expect(
      userService.createSuperuser("admin", "pass", "Admin")
    ).rejects.toThrow(BadRequestError);
  });
});
