import { Student } from "../../../core/domain/student.model";
import { FindStudentByIdDTO } from "../../../core/dto/student/findById.dto";
import { IFindStudentByIdFeature } from "../../../core/ports/in/student/findStudentById.port";
import { IStudentRepository } from "../../../core/ports/out/repositories/student.repository.port";

export class FindStudentByIdFeature implements IFindStudentByIdFeature {
  constructor(private readonly studentRepository: IStudentRepository) {}

  async execute(input: FindStudentByIdDTO): Promise<Student> {
    return await this.studentRepository.findById(input.studentId);
  }
}
