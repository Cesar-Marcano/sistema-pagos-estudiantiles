import { Feature } from "../../../../shared/interfaces/feature";
import { Student } from "../../../domain/student.model";
import { UpdateGradeDTO } from "../../../dto/student/update.dto";

export type IUpdateStudentGradeFeature = Feature<
  UpdateGradeDTO,
  Promise<Student>
>;
