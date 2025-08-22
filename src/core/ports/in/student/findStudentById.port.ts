import { Feature } from "../../../../shared/interfaces/feature";
import { Paginated } from "../../../../shared/interfaces/paginated";
import { Student } from "../../../domain/student.model";
import { FindStudentByIdDTO } from "../../../dto/student/findById.dto";

export type IFindStudentByIdFeature = Feature<
  FindStudentByIdDTO,
  Promise<Paginated<Student>>
>;
