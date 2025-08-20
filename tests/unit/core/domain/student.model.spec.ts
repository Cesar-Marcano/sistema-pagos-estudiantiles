import { Student } from "../../../../src/core/domain/student.model";
import { testDbStudent, testNewStudent } from "../../../helpers/data/student";

describe("User model", () => {
  let student: Student;
  let studentFromDB: Student;

  beforeEach(() => {
    student = testNewStudent();
    studentFromDB = testDbStudent();
  });

  describe("Student creation", () => {
    it("should create a new student with correct default properties", () => {
      expect(student.createdAt).toBeInstanceOf(Date);
      expect(student.updatedAt).toBe(student.createdAt);
      expect(student.deletedAt).toBeNull();
    });
  });

  describe("Student from DB", () => {
    it("should have db data", () => {
      expect(studentFromDB.id).not.toBeUndefined();
      expect(studentFromDB.id).toBe(1);
      expect(studentFromDB.createdAt).toBeInstanceOf(Date);
      expect(studentFromDB.updatedAt).toBeInstanceOf(Date);
    });
  });
});
