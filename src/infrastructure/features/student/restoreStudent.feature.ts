import { Student } from "../../../core/domain/student.model";
import { RestoreStudentDTO } from "../../../core/dto/student/restore.dto";
import { IRestoreStudentFeature } from "../../../core/ports/in/student/restoreStudent.port";
import { IStudentRepository } from "../../../core/ports/out/repositories/student.repository.port";

export class RestoreStudentFeature implements IRestoreStudentFeature {
  constructor(private readonly studentRepository: IStudentRepository) {}

  async execute(input: RestoreStudentDTO): Promise<Student> {
    const student = await this.studentRepository.findById(input.studentId);

    if (!student)
      throw new Error("RestoreStudentFeature error: student doesn't exist.");

    student.restore();

    return await this.studentRepository.update(student);
  }
}
