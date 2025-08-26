import { Repository } from "typeorm";
import {
  IRoleRepository,
  IRoleSearchCriteria,
} from "../../core/ports/out/repositories/role.repository.port";
import { RoleEntity } from "../entities/role.entity";
import { Role } from "../../core/domain/role.model";
import { Paginated } from "../../shared/interfaces/paginated";

export class RoleRepository implements IRoleRepository {
  constructor(private readonly repo: Repository<RoleEntity>) {}

  async create(role: Role): Promise<Role> {
    const roleEntity = this.repo.create({
      name: role.name,
      permissions: role.permissions,
      deletedAt: role.deletedAt,
      tier: role.tier,
    });

    const savedEntity = await this.repo.save(roleEntity);

    return new Role(
      savedEntity.name,
      savedEntity.tier,
      savedEntity.permissions,
      savedEntity.createdAt,
      savedEntity.updatedAt,
      savedEntity.deletedAt,
      savedEntity.id
    );
  }
  upsert(role: Role): Promise<Role> {
    throw new Error("Method not implemented.");
  }
  findById(roleId: number): Promise<Role> {
    throw new Error("Method not implemented.");
  }
  search(criteria: IRoleSearchCriteria): Promise<Paginated<Role>> {
    throw new Error("Method not implemented.");
  }
  roleExists(roleId: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  softDelete(id: number): Promise<Role> {
    throw new Error("Method not implemented.");
  }
  restore(id: number): Promise<Role> {
    throw new Error("Method not implemented.");
  }
}
