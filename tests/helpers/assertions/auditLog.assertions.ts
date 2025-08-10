import { AuditLogService } from "../../../src/services/auditLog.service";

export function expectAuditLogCalledWith(
  auditLogService: AuditLogService,
  action: string,
  entity: string,
  entityId: number
) {
  expect(auditLogService.register).toHaveBeenCalledWith(
    expect.objectContaining({
      action,
      entity,
      entityId,
      performedBy: expect.any(Number),
    })
  );
}
