import { AuditLogsService } from "../../../src/services/auditLogs.service";

export const auditLogsServiceMock = (): AuditLogsService =>
  ({
    registerLog: jest.fn(),
  } as unknown as AuditLogsService);
