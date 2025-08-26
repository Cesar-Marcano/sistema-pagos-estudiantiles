import { Student } from "../../../core/domain/student.model";
import { UpdateStudentJoinPeriodDTO } from "../../../core/dto/student/update.dto";
import { IUpdateStudentJoinPeriodFeature } from "../../../core/ports/in/student/updateStudentJoinPeriod.port";
import { IPeriodRepository } from "../../../core/ports/out/repositories/period.repository.port";
import { IStudentRepository } from "../../../core/ports/out/repositories/student.repository.port";

export class UpdateStudentPeriodFeature implements IUpdateStudentJoinPeriodFeature {
  constructor(
    private readonly studentRepository: IStudentRepository,
    private readonly periodRepository: IPeriodRepository
  ) {}

  async execute(input: UpdateStudentJoinPeriodDTO): Promise<Student> {
    const student = await this.studentRepository.findById(input.id);

    if (!student)
      throw new Error("UpdateStudentPeriod error: student not found.");

    const period = await this.periodRepository.findById(input.period);

    if (!period)
      throw new Error("UpdateStudentPeriod error: period not found.");

    student.updateJoinPeriod(input.period);

    return await this.studentRepository.update(student);
  }
}
