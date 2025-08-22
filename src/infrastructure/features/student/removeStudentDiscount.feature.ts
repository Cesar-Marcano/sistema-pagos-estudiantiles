import { Student } from "../../../core/domain/student.model";
import { RemoveDiscountDTO } from "../../../core/dto/student/updateDiscounts.dto";
import { IRemoveStudentDiscount } from "../../../core/ports/in/student/removeStudentDiscount.port";
import { IStudentRepository } from "../../../core/ports/out/repositories/student.repository.port";

export class RemoveStudentDiscount implements IRemoveStudentDiscount {
  constructor(private readonly studentRepository: IStudentRepository) {}

  async execute(input: RemoveDiscountDTO): Promise<Student> {
    const student = await this.studentRepository.findById(input.id);

    if (!student)
      throw new Error("RemoveStudentDiscountFeature error: student not found.");

    student.removeDiscount(input.discount);

    return this.studentRepository.update(student);
  }
}
