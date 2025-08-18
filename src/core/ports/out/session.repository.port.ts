import { Session } from "../../domain/session.model";

export interface ISessionRepository {
  create(session: Session): Promise<Session>;

  findByName(name: string): Promise<Session>;

  deleteById(id: number): Promise<Session>;
  deleteByJti(jti: string): Promise<Session>;

  deleteAllByUserId(userId: number): Promise<Session>;
}
