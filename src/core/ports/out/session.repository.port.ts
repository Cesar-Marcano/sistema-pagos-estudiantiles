import { Session } from "../../domain/session.model";

export interface ISessionRepository {
  create(session: Session): Promise<Session>;

  findManyByUserId(id: number): Promise<Session>;

  deleteById(id: number): Promise<Session>;
  deleteByJti(jti: string): Promise<Session>;

  deleteAllByUserId(userId: number): Promise<Session>;

  sessionExistsById(id: number): Promise<boolean>;
  sessionExistsByJti(jti: string): Promise<boolean>;
}
