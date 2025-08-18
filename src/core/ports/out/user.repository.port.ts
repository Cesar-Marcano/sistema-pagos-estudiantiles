import { User } from "../../domain/user.model";

export interface IUserRepository {
  create(user: User): Promise<User>;

  update(id: number, user: Partial<User>): Promise<User>;

  changePassword(id: number, password: string): Promise<User>;

  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;

  softDelete(id: number): Promise<User>;
  restore(id: number): Promise<User>;

  existsById(id: number): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
}
