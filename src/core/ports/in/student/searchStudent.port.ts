import { Feature } from "../../../../shared/interfaces/feature";
import { Paginated } from "../../../../shared/interfaces/paginated";
import { Student } from "../../../domain/student.model";
import { SearchStudentsDTO } from "../../../dto/student/search.dto";

export type ISearchStudentFeature = Feature<
  SearchStudentsDTO,
  Promise<Paginated<Student>>
>;
