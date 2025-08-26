import { Feature } from "../../../../shared/interfaces/feature";
import { Student } from "../../../domain/student.model";
import { UpdateStudentJoinPeriodDTO } from "../../../dto/student/update.dto";

export type IUpdateStudentJoinPeriodFeature = Feature<
  UpdateStudentJoinPeriodDTO,
  Promise<Student>
>;
