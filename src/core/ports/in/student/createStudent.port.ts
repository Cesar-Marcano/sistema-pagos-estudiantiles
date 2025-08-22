import { Feature } from "../../../../shared/interfaces/feature";
import { Student } from "../../../domain/student.model";
import { CreateStudentDTO } from "../../../dto/student/create.dto";

export type ICreateStudentFeature = Feature<CreateStudentDTO, Promise<Student>>;
