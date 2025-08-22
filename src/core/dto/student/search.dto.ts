import { IStudentSearchCriteria } from "../../ports/out/repositories/student.repository.port";

export class SearchStudentsDTO {
  constructor(public readonly criteria: IStudentSearchCriteria) {}
}
