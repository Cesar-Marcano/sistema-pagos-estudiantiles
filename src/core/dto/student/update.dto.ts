export class UpdateFullnameDTO {
  constructor(public readonly id: number, public readonly fullname: string) {}
}

export class UpdateBirthdayDTO {
  constructor(public readonly id: number, public readonly birthday: Date) {}
}

export class UpdateSectionDTO {
  constructor(
    public readonly id: number,
    public readonly section: string | null
  ) {}
}

export class UpdateGradeDTO {
  constructor(
    public readonly id: number,
    public readonly grade: number,
    public readonly gradeLevel: number | null = null
  ) {}
}

export class UpdateGradeLevelDTO {
  constructor(public readonly id: number, public readonly gradeLevel: number) {}
}

export class UpdateJoinGradeDTO {
  constructor(
    public readonly id: number,
    public readonly joinGrade: number,
    public readonly joinGradeLevel: number | null = null
  ) {}
}

export class UpdateJoinGradeLevelDTO {
  constructor(
    public readonly id: number,
    public readonly joinGradeLevel: number
  ) {}
}

export class UpdateStudentPeriodDTO {
  constructor(public readonly id: number, public readonly period: number) {}
}

export class UpdateParentDTO {
  constructor(public readonly id: number, public readonly parent: number) {}
}
