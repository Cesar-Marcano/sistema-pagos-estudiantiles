import { Feature } from "../../../../shared/interfaces/feature";
import { Student } from "../../../domain/student.model";
import { FindStudentByIdDTO } from "../../../dto/student/findById.dto";

export type ISoftDeleteStudentFeature = Feature<
  FindStudentByIdDTO,
  Promise<Student>
>;
