import { Feature } from "../../../../shared/interfaces/feature";
import { Student } from "../../../domain/student.model";
import { UpdateFullnameDTO } from "../../../dto/student/update.dto";

export type IUpdateStudentFullnameFeature = Feature<
  UpdateFullnameDTO,
  Promise<Student>
>;
