import { Paginated } from "../../../../shared/interfaces/paginated";
import { User } from "../../../domain/user.model";

export interface IUserSearchCriteria {
  query?: {
    id?: number;
    username?: string;
    name?: string;
    email?: string;
    createdById?: number;
    createdAt?: Date;
    deletedAt?: Date;
  };
  page: number;
  pageSize: number;
  includeDeleted: boolean;
}

export interface IUserRepository {
  create(user: User): Promise<User>;

  upsert(user: User): Promise<User>;

  changePassword(id: number, password: string): Promise<User>;

  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  search(criteria: IUserSearchCriteria): Promise<Paginated<User>>;

  softDelete(id: number): Promise<User>;
  restore(id: number): Promise<User>;

  existsById(id: number): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
}
