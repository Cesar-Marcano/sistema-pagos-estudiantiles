import { Feature } from "../../../../shared/interfaces/feature";
import { Student } from "../../../domain/student.model";
import { AddDiscountDTO } from "../../../dto/student/updateDiscounts.dto";

export type IAddStudentDiscount = Feature<AddDiscountDTO, Promise<Student>>;
