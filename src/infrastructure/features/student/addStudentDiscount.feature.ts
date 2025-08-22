import { Student } from "../../../core/domain/student.model";
import { AddDiscountDTO } from "../../../core/dto/student/updateDiscounts.dto";
import { IAddStudentDiscount } from "../../../core/ports/in/student/addStudentDiscount.port";
import { IDiscountRepository } from "../../../core/ports/out/repositories/discount.repository.port";
import { IStudentRepository } from "../../../core/ports/out/repositories/student.repository.port";

export class AddStudentDiscount implements IAddStudentDiscount {
  constructor(
    private readonly studentRepository: IStudentRepository,
    private readonly discountRepository: IDiscountRepository
  ) {}

  async execute(input: AddDiscountDTO): Promise<Student> {
    const student = await this.studentRepository.findById(input.id);

    if (!student)
      throw new Error("AddStudentDiscountFeature error: student not found.");

    const discount = await this.discountRepository.exists(input.discount);

    if (!discount)
      throw new Error("AddStudentDiscountFeature error: discount not found.");

    student.addDiscount(input.discount);

    return this.studentRepository.update(student);
  }
}
