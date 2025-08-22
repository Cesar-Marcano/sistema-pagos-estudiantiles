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
  constructor(public readonly id: number, public readonly grade: number) {}
}

export class UpdateGradeLevelDTO {
  constructor(
    public readonly id: number,
    public readonly gradeLevel: number | null
  ) {}
}

export class UpdateJoinGradeDTO {
  constructor(
    public readonly id: number,
    public readonly joinGrade: number
  ) {}
}

export class UpdateJoinGradeLevelDTO {
  constructor(
    public readonly id: number,
    public readonly joinGradeLevel: number | null
  ) {}
}

export class UpdateParentDTO {
  constructor(public readonly id: number, public readonly parent: number) {}
}
