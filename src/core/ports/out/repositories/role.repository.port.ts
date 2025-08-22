import { Paginated } from "../../../../shared/interfaces/paginated";
import { Permission, Role } from "../../../domain/role.model";

export interface IRoleSearchCriteria {
  query?: {
    id?: number;
    name?: string;
    includingPermissions?: Permission[];
    tier?: number;
    createdById?: number;
    createdAt?: Date;
    deletedAt?: Date;
  };
  page: number;
  pageSize: number;
  includeDeleted: boolean;
}

export interface IRoleRepository {
  create(role: Role): Promise<Role>;

  upsert(role: Role): Promise<Role>;

  findById(roleId: number): Promise<Role>;
  search(criteria: IRoleSearchCriteria): Promise<Paginated<Role>>;

  roleExists(roleId: number): Promise<boolean>;

  softDelete(id: number): Promise<Role>;
  restore(id: number): Promise<Role>;
}
