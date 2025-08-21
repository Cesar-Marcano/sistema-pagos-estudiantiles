import { Period } from "../../../../src/core/domain/period.model";

describe("Period model", () => {
  let period: Period;
  let periodFromDB: Period;

  beforeEach(() => {
    period = Period.create(2025, 8, 1);

    periodFromDB = new Period(
      2024,
      5,
      2,
      new Date("2024-05-01"),
      new Date("2024-05-01"),
      null,
      1
    );
  });

  describe("Period creation", () => {
    it("should create a new period with correct default properties", () => {
      expect(period.createdAt).toBeInstanceOf(Date);
      expect(period.updatedAt).toBe(period.createdAt);
      expect(period.deletedAt).toBeNull();
      expect(period.year).toBe(2025);
      expect(period.month).toBe(8);
      expect(period.createdBy).toBe(1);
    });

    it("should throw an error for invalid year", () => {
      expect(() => Period.create(1800, 5, 1)).toThrow("Invalid year");
    });

    it("should throw an error for invalid month", () => {
      expect(() => Period.create(2025, 0, 1)).toThrow("Invalid month");
      expect(() => Period.create(2025, 13, 1)).toThrow("Invalid month");
    });
  });

  describe("Period from DB", () => {
    it("should have db data", () => {
      expect(periodFromDB.id).toBe(1);
      expect(periodFromDB.year).toBe(2024);
      expect(periodFromDB.month).toBe(5);
      expect(periodFromDB.createdAt).toBeInstanceOf(Date);
      expect(periodFromDB.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe("Deletion and restoration", () => {
    beforeEach(() => {
      period.delete();
    });

    it("should delete the period", () => {
      expect(period.deletedAt).not.toBeNull();
    });

    it("should not delete again if already deleted", () => {
      const updatedAtBeforeSecondDelete = period.updatedAt;
      period.delete();
      expect(period.updatedAt).toBe(updatedAtBeforeSecondDelete);
    });

    it("should restore the period", () => {
      period.restore();
      expect(period.deletedAt).toBeNull();
    });

    it("should not restore if it was never deleted", () => {
      const freshPeriod = Period.create(2025, 9, 1);
      const initialUpdatedAt = freshPeriod.updatedAt;
      freshPeriod.restore();
      expect(freshPeriod.deletedAt).toBeNull();
      expect(freshPeriod.updatedAt).toBe(initialUpdatedAt);
    });
  });
});
