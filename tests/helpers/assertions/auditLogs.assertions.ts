import { AuditLogService } from "../../../src/services/auditLog.service";

export function expectAuditLogCalledWith(
  auditLogsService: AuditLogService,
  action: string,
  entity: string,
  entityId: number
) {
  expect(auditLogsService.register).toHaveBeenCalledWith(
    expect.objectContaining({
      action,
      entity,
      entityId,
      performedBy: expect.any(Number),
    })
  );
}
