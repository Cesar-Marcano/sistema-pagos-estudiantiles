import { Feature } from "../../../../shared/interfaces/feature";
import { Student } from "../../../domain/student.model";
import { SoftDeleteStudentDTO } from "../../../dto/student/softDelete.dto";

export type ISoftDeleteStudentFeature = Feature<
  SoftDeleteStudentDTO,
  Promise<Student>
>;
