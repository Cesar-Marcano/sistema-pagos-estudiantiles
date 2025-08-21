import { IdentificationDocument } from "../../../../src/core/datavalues/document.datavalue";
import {
  Student,
  StudentStatus,
} from "../../../../src/core/domain/student.model";
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

  describe("Discount updates", () => {
    let oldUpdatedAt: Date;

    beforeEach(() => {
      oldUpdatedAt = student.updatedAt;
      student.addDiscount(2);
    });

    it("should add discount", () => {
      expect(student.discounts.includes(2)).toBeTruthy();
      expect(student.updatedAt).not.toBe(oldUpdatedAt);
    });

    it("should remove a discount", () => {
      student.removeDiscount(2);

      expect(student.discounts.includes(2)).toBeFalsy();
      expect(student.updatedAt).not.toBe(oldUpdatedAt);
    });

    describe("Content updates", () => {
      it("should update the document", () => {
        const oldUpdatedAt = student.updatedAt;
        const newDocument = new IdentificationDocument("V-123456");
        student.updateDocument(newDocument);

        expect(student.document).toBe(newDocument);
        expect(student.updatedAt).not.toBe(oldUpdatedAt);
      });

      it("should update the fullname", () => {
        const oldUpdatedAt = student.updatedAt;
        const newFullname = "John Doe";
        student.updateFullname(newFullname);

        expect(student.fullname).toBe(newFullname);
        expect(student.updatedAt).not.toBe(oldUpdatedAt);
      });

      it("should update the grade", () => {
        const oldUpdatedAt = student.updatedAt;
        const newGrade = 5;
        student.updateGrade(newGrade, null);

        expect(student.grade).toBe(newGrade);
        expect(student.gradeLevel).toBeNull();
        expect(student.updatedAt).not.toBe(oldUpdatedAt);
      });

      it("should update the join grade", () => {
        const oldUpdatedAt = student.updatedAt;
        const newJoinGrade = 5;
        student.updateJoinGrade(newJoinGrade, 2);

        expect(student.joinGrade).toBe(newJoinGrade);
        expect(student.joinGradeLevel).toBe(2);
        expect(student.updatedAt).not.toBe(oldUpdatedAt);
      });

      it("should update the join period", () => {
        const oldUpdatedAt = student.updatedAt;
        const newJoinPeriod = 6;
        student.updateJoinPeriod(newJoinPeriod);

        expect(student.joinPeriod).toBe(newJoinPeriod);
        expect(student.updatedAt).not.toBe(oldUpdatedAt);
      });

      it("should update the parent", () => {
        const oldUpdatedAt = student.updatedAt;
        const newParent = 1;
        student.updateParent(newParent);

        expect(student.parent).toBe(newParent);
        expect(student.updatedAt).not.toBe(oldUpdatedAt);
      });

      it("should update the section", () => {
        const oldUpdatedAt = student.updatedAt;
        const newSection = "C";
        student.updateSection(newSection);

        expect(student.section).toBe(newSection);
        expect(student.updatedAt).not.toBe(oldUpdatedAt);
      });

      it("should update the status", () => {
        const oldUpdatedAt = student.updatedAt;
        const newStatus = StudentStatus.Inactive;
        student.updateStatus(newStatus);

        expect(student.status).toBe(newStatus);
        expect(student.updatedAt).not.toBe(oldUpdatedAt);
      });
    });
  });
});
