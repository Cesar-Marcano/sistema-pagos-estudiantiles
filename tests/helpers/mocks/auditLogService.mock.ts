import { AuditLogService } from "../../../src/services/auditLog.service";

export const auditLogServiceMock = (): AuditLogService =>
  ({
    register: jest.fn(),
  } as unknown as AuditLogService);
