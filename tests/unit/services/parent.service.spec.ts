import "../../helpers/mocks/asyncLocalStorage.mock";
import { PrismaClient } from "@prisma/client";
import { ParentService } from "../../../src/services/parent.service";
import { createMockPrisma } from "../../helpers/factories/prisma.factory";
import { AuditLogsService } from "../../../src/services/auditLogs.service";
import { auditLogsServiceMock } from "../../helpers/mocks/auditLogsService.mock";
import {
  deletedSampleParent,
  sampleParent,
  sampleParentInput,
  updatedSampleParent,
} from "../../helpers/data/parent.data";
import { expectAuditLogCalledWith } from "../../helpers/assertions/auditLogs.assertions";
import { getPaginationSkip } from "../../helpers/utils/getPaginationSkip";
import { BadRequestError } from "../../../src/errors/badRequest.error";

describe("ParentService", () => {
  let prisma: PrismaClient;
  let auditLogsService: AuditLogsService;
  let parentService: ParentService;

  beforeEach(() => {
    prisma = createMockPrisma(["parent"], {
      parent: {
        create: jest.fn().mockResolvedValue(sampleParent),
        findUnique: jest.fn().mockResolvedValue(sampleParent),
        findMany: jest.fn().mockResolvedValue([sampleParent]),
        update: jest.fn().mockResolvedValue(updatedSampleParent),
      },
    });
    auditLogsService = auditLogsServiceMock();
    parentService = new ParentService(prisma, auditLogsService);
  });

  it("should create a parent", async () => {
    const parent = await parentService.create(sampleParentInput);

    expectAuditLogCalledWith(auditLogsService, "CREATE", "Parent", 1);

    expect(parent).toEqual(sampleParent);
    expect(prisma.parent.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: sampleParentInput,
      })
    );
  });

  it("should retrieve a parent by id", async () => {
    const parent = await parentService.findById(1);

    expect(auditLogsService.registerLog).not.toHaveBeenCalled();

    expect(parent).toEqual(sampleParent);

    expect(prisma.parent.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          deletedAt: null,
        }),
      })
    );
  });

  it("should retrieve all parents", async () => {
    const page = 1;
    const limit = 10;

    const { take, skip } = getPaginationSkip(page, limit);

    (prisma.$transaction as jest.Mock) = jest
      .fn()
      .mockResolvedValue([[sampleParent], 1]);

    const parents = await parentService.list({ page, limit });

    expect(parents.data.length).toBeGreaterThan(0);
    expect(parents.data[0]).toEqual(sampleParent);
    expect(parents).toEqual(
      expect.objectContaining({
        pagination: expect.objectContaining({
          total: 1,
          totalPages: Math.ceil(1 / limit),
          page,
          limit,
        }),
      })
    );

    expect(prisma.parent.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip,
        take,
      })
    );

    expect(prisma.parent.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          deletedAt: null,
        }),
      })
    );
  });

  it("should update a parent", async () => {
    const parent = await parentService.update(1, {
      fullname: "Alberson Foo Bar",
    });

    expectAuditLogCalledWith(auditLogsService, "UPDATE", "Parent", 1);

    expect(parent).toEqual(updatedSampleParent);

    expect(prisma.parent.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          deletedAt: null,
          id: 1,
        }),
        data: {
          fullname: "Alberson Foo Bar",
        },
      })
    );
  });

  it("should not update a parent", async () => {
    try {
      await parentService.update(1, {});
      fail("Should fail");
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
    }
  });

  it("should delete a parent", async () => {
    (prisma.parent.update as jest.Mock) = jest
      .fn()
      .mockResolvedValue(deletedSampleParent);

    const parent = await parentService.delete(1);

    expectAuditLogCalledWith(auditLogsService, "DELETE", "Parent", 1);

    expect(parent).toEqual(
      expect.objectContaining({
        deletedAt: expect.any(Date),
      })
    );

    expect(prisma.parent.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          deletedAt: null,
        }),
        data: expect.objectContaining({
          deletedAt: expect.any(Date),
        }),
      })
    );
  });
});
