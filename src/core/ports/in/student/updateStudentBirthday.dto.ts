import { Feature } from "../../../../shared/interfaces/feature";
import { Student } from "../../../domain/student.model";
import { UpdateBirthdayDTO } from "../../../dto/student/update.dto";

export type IUpdateStudentBirthdayFeature = Feature<
  UpdateBirthdayDTO,
  Promise<Student>
>;
