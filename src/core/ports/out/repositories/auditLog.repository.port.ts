import { Paginated } from "../../../../shared/interfaces/paginated"; 
import { AuditLog, AuditLogActions, Entities } from "../../../domain/auditLog.model";

export interface IAuditLogSearchCriteria {
  query?: {
    entity?: Entities;
    entityId?: number;
    action?: AuditLogActions;
    createdById?: number;
    createdAt?: Date;
    deletedAt?: Date;
  };
  page: number;
  pageSize: number;
  includeDeleted: boolean;
}

export interface IAuditLog {
  create(auditLog: AuditLog): Promise<AuditLog>;

  search(criteria: IAuditLogSearchCriteria): Promise<Paginated<AuditLog>>;
  findById(id: number): Promise<AuditLog>;
}
