import { Feature } from "../../../../shared/interfaces/feature";
import { Student } from "../../../domain/student.model";
import { UpdateJoinGradeLevelDTO } from "../../../dto/student/update.dto";

export type IUpdateStudentJoinGradeLevelFeature = Feature<
  UpdateJoinGradeLevelDTO,
  Promise<Student>
>;
