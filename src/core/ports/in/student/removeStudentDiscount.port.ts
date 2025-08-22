import { Feature } from "../../../../shared/interfaces/feature";
import { Student } from "../../../domain/student.model";
import { RemoveDiscountDTO } from "../../../dto/student/updateDiscounts.dto";

export type IRemoveStudentDiscount = Feature<
  RemoveDiscountDTO,
  Promise<Student>
>;
