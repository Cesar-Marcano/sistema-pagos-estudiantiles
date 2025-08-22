import { Feature } from "../../../../shared/interfaces/feature";
import { Student } from "../../../domain/student.model";
import { UpdateJoinGradeDTO } from "../../../dto/student/update.dto";

export type IUpdateStudentJoinGradeFeature = Feature<
  UpdateJoinGradeDTO,
  Promise<Student>
>;
