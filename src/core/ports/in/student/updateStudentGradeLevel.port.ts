import { Feature } from "../../../../shared/interfaces/feature";
import { Student } from "../../../domain/student.model";
import { UpdateGradeLevelDTO } from "../../../dto/student/update.dto";

export type IUpdateStudentGradeLevelFeature = Feature<
  UpdateGradeLevelDTO,
  Promise<Student>
>;
