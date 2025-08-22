import { Student } from "../../../core/domain/student.model";
import { FindStudentByIdDTO } from "../../../core/dto/student/findById.dto";
import { IRestoreStudentFeature } from "../../../core/ports/in/student/restoreStudent.port";
import { IStudentRepository } from "../../../core/ports/out/repositories/student.repository.port";

export class RestoreStudentFeature implements IRestoreStudentFeature {
  constructor(private readonly studentRepository: IStudentRepository) {}

  async execute(input: FindStudentByIdDTO): Promise<Student> {
    const student = await this.studentRepository.findById(input.studentId);

    if (!student)
      throw new Error("RestoreStudentFeature error: student doesn't exist.");

    student.restore();

    return await this.studentRepository.update(student);
  }
}
