export class UpdateFullnameDTO {
  constructor(private readonly id: number, private readonly fullname: string) {}
}

export class UpdateBirthdayDTO {
  constructor(private readonly id: number, private readonly birthday: Date) {}
}

export class UpdateSectionDTO {
  constructor(
    private readonly id: number,
    private readonly section: string | null
  ) {}
}

export class UpdateGradeDTO {
  constructor(private readonly id: number, private readonly grade: number) {}
}

export class UpdateGradeLevelDTO {
  constructor(
    private readonly id: number,
    private readonly gradeLevel: number | null
  ) {}
}

export class UpdateJoinGradeDTO {
  constructor(
    private readonly id: number,
    private readonly joinGrade: number
  ) {}
}

export class UpdateJoinGradeLevelDTO {
  constructor(
    private readonly id: number,
    private readonly joinGradeLevel: number | null
  ) {}
}

export class UpdateParentDTO {
  constructor(private readonly id: number, private readonly parent: number) {}
}
