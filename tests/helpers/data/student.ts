import { Student, StudentStatus } from "../../../src/core/domain/student.model";

export const sampleStudentData = {
  fullname: "Foo Bar Foo Bar",
  birthday: new Date(),
  section: null,
  document: null,
  status: StudentStatus.Active,
  grade: 2,
  gradeLevel: null,
  joinGrade: 1,
  joinGradeLevel: null,
  joinPeriod: 1,
  discounts: [],
  parent: 1,
  createdBy: 1,
};

export const testNewStudent = () => {
  return Student.create(
    sampleStudentData.fullname,
    sampleStudentData.birthday,
    sampleStudentData.section,
    sampleStudentData.document,
    sampleStudentData.status,
    sampleStudentData.grade,
    sampleStudentData.gradeLevel,
    sampleStudentData.joinGrade,
    sampleStudentData.joinGradeLevel,
    sampleStudentData.joinPeriod,
    sampleStudentData.discounts,
    sampleStudentData.parent,
    sampleStudentData.createdBy
  );
};

export const testDbStudent = () => {
  return new Student(
    sampleStudentData.fullname,
    sampleStudentData.birthday,
    sampleStudentData.section,
    sampleStudentData.document,
    sampleStudentData.status,
    sampleStudentData.grade,
    sampleStudentData.gradeLevel,
    sampleStudentData.joinGrade,
    sampleStudentData.joinGradeLevel,
    sampleStudentData.joinPeriod,
    sampleStudentData.discounts,
    sampleStudentData.parent,
    sampleStudentData.createdBy,
    new Date(),
    new Date(),
    null,
    1
  );
};
