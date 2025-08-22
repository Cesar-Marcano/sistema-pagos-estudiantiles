import { Feature } from "../../../../shared/interfaces/feature";
import { Student } from "../../../domain/student.model";
import { RestoreStudentDTO } from "../../../dto/student/restore.dto";

export type IRestoreStudentFeature = Feature<
  RestoreStudentDTO,
  Promise<Student>
>;
