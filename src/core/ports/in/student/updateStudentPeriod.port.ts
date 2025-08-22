import { Feature } from "../../../../shared/interfaces/feature";
import { Student } from "../../../domain/student.model";
import { UpdateStudentPeriodDTO } from "../../../dto/student/update.dto";

export type IUpdateStudentPeriodFeature = Feature<
  UpdateStudentPeriodDTO,
  Promise<Student>
>;
