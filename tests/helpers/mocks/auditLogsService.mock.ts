import { AuditLogService } from "../../../src/services/auditLog.service";

export const auditLogsServiceMock = (): AuditLogService =>
  ({
    registerLog: jest.fn(),
  } as unknown as AuditLogService);
