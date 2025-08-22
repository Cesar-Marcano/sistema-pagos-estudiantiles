import { Student } from "../../../core/domain/student.model";
import { SearchStudentsDTO } from "../../../core/dto/student/search.dto";
import { ISearchStudentFeature } from "../../../core/ports/in/student/searchStudent.port";
import { IStudentRepository } from "../../../core/ports/out/repositories/student.repository.port";
import { Paginated } from "../../../shared/interfaces/paginated";

export class SearchStudentsFeature implements ISearchStudentFeature {
  constructor(private readonly studentRepository: IStudentRepository) {}

  async execute(input: SearchStudentsDTO): Promise<Paginated<Student>> {
    return await this.studentRepository.search(input.criteria);
  }
}
