import { Feature } from "../../../../shared/interfaces/feature";
import { Student } from "../../../domain/student.model";
import { UpdateSectionDTO } from "../../../dto/student/update.dto";

export type IUpdateStudentSectionFeature = Feature<
  UpdateSectionDTO,
  Promise<Student>
>;
