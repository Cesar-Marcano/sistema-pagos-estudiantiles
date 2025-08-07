import { AuditLogsService } from "../../../src/services/auditLogs.service";

export const auditLogsServiceMock = {
  registerLog: jest.fn(),
} as unknown as AuditLogsService;
