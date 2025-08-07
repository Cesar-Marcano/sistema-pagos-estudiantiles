import { AuditLogsService } from "../../../src/services/auditLogs.service";

export function expectAuditLogCalledWith(
  auditLogsService: AuditLogsService,
  action: string,
  entity: string,
  entityId: number
) {
  expect(auditLogsService.registerLog).toHaveBeenCalledWith(
    expect.objectContaining({
      action,
      entity,
      entityId,
      performedBy: expect.any(Number),
    })
  );
}
