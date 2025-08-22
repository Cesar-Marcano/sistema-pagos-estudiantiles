import { Student } from "../../../core/domain/student.model";
import { SoftDeleteStudentDTO } from "../../../core/dto/student/softDelete.dto";
import { ISoftDeleteStudentFeature } from "../../../core/ports/in/student/softDeleteStudent.port";
import { IStudentRepository } from "../../../core/ports/out/repositories/student.repository.port";

export class SoftDeleteStudentFeature implements ISoftDeleteStudentFeature {
  constructor(private readonly studentRepository: IStudentRepository) {}

  async execute(input: SoftDeleteStudentDTO): Promise<Student> {
    const student = await this.studentRepository.findById(input.studentId);

    if (!student)
      throw new Error("SoftDeleteStudentFeature error: student doesn't exist.");

    student.delete();

    return await this.studentRepository.update(student);
  }
}
