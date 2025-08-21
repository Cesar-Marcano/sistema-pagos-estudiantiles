import { Session } from "../../../../src/core/domain/session.model";

describe("Session model", () => {
  let session: Session;
  let sessionFromDB: Session;

  beforeEach(() => {
    session = Session.create("random-jti-token", 42);
    sessionFromDB = new Session(
      "existing-jti-token",
      7,
      new Date("2023-01-01T00:00:00Z"),
      1
    );
  });

  describe("Session creation", () => {
    it("should create a new session with correct default properties", () => {
      expect(session.jti).toBe("random-jti-token");
      expect(session.user).toBe(42);
      expect(session.createdAt).toBeInstanceOf(Date);
      expect(session.id).toBeUndefined();
    });
  });

  describe("Session from DB", () => {
    it("should have db data", () => {
      expect(sessionFromDB.id).not.toBeUndefined();
      expect(sessionFromDB.id).toBe(1);
      expect(sessionFromDB.jti).toBe("existing-jti-token");
      expect(sessionFromDB.user).toBe(7);
      expect(sessionFromDB.createdAt).toBeInstanceOf(Date);
      expect(sessionFromDB.createdAt.toISOString()).toBe(
        "2023-01-01T00:00:00.000Z"
      );
    });
  });
});
