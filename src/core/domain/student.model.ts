import { IdentificationDocument } from "../datavalues/document.datavalue";

export enum StudentStatus {
  Active,
  Inactive,
}

export class Student {
  constructor(
    private _fullname: string,
    private _birthday: Date,
    private _section: string | null,
    private _document: IdentificationDocument | null,
    private _status: StudentStatus,

    private _grade: number,
    private _gradeLevel: number | null,

    private _joinGrade: number,
    private _joinGradeLevel: number | null,
    private _joinPeriod: number,

    private _discounts: number[],

    private _parent: number,

    private _createdBy: number,

    private readonly _createdAt: Date,
    private _updatedAt: Date,
    private _deletedAt: Date | null,
    private _id?: number
  ) {}

  public static create(
    _fullname: string,
    _birthday: Date,
    _section: string | null,
    _document: IdentificationDocument | null,
    _status: StudentStatus,

    _grade: number,
    _gradeLevel: number | null,

    _joinGrade: number,
    _joinGradeLevel: number | null,
    _joinPeriod: number,

    _parent: number,

    _createdBy: number
  ): Student {
    const now = new Date();

    const fullname = _fullname.trim();
    if (fullname.length < 7) {
      throw new Error("Invalid fullname");
    }

    if (!(_birthday instanceof Date) || isNaN(_birthday.getTime())) {
      throw new Error("Invalid birthday date");
    }

    if (!_parent) {
      throw new Error("Parent is required");
    }

    return new Student(
      fullname,
      _birthday,
      _section,
      _document,
      _status,
      _grade,
      _gradeLevel,
      _joinGrade,
      _joinGradeLevel,
      _joinPeriod,
      [],
      _parent,
      _createdBy,
      now,
      now,
      null
    );
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get fullname(): string {
    return this._fullname;
  }

  public get birthday(): Date {
    return this._birthday;
  }

  public get section(): string | null {
    return this._section;
  }

  public get document(): IdentificationDocument | null {
    return this._document;
  }

  public get status(): StudentStatus {
    return this._status;
  }

  public get grade(): number {
    return this._grade;
  }

  public get gradeLevel(): number | null {
    return this._gradeLevel;
  }

  public get joinGrade(): number {
    return this._joinGrade;
  }

  public get joinGradeLevel(): number | null {
    return this._joinGradeLevel;
  }

  public get joinPeriod(): number {
    return this._joinPeriod;
  }

  public get discounts(): number[] {
    return this._discounts;
  }

  public get parent(): number {
    return this._parent;
  }

  public get createdBy(): number {
    return this._createdBy;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public get deletedAt(): Date | null {
    return this._deletedAt;
  }

  public updateFullname(val: string): this {
    const fullname = val.trim();
    if (fullname.length < 7) {
      throw new Error("Invalid fullname");
    }
    this._fullname = fullname;
    this._updatedAt = new Date();
    return this;
  }

  public updateSection(val: string | null): this {
    this._section = val;
    this._updatedAt = new Date();
    return this;
  }

  public updateBirthday(val: Date): this {
    if (!(val instanceof Date) || isNaN(val.getTime())) {
      throw new Error("Invalid birthday date");
    }

    this._birthday = val;
    this._updatedAt = new Date();

    return this;
  }

  public updateDocument(val: IdentificationDocument | null): this {
    this._document = val;
    this._updatedAt = new Date();
    return this;
  }

  public updateStatus(val: StudentStatus): this {
    this._status = val;
    this._updatedAt = new Date();
    return this;
  }

  public updateGrade(grade: number): this {
    this._grade = grade;

    this._updatedAt = new Date();

    return this;
  }

  public updateGradeLevel(gradeLevel: number | null): this {
    this._gradeLevel = gradeLevel;

    this._updatedAt = new Date();

    return this;
  }

  public updateJoinGrade(grade: number, level: number | null): this {
    this._joinGrade = grade;
    this._joinGradeLevel = level;

    this._updatedAt = new Date();

    return this;
  }

  public updateJoinGradeLevel(gradeLevel: number | null): this {
    this._joinGradeLevel = gradeLevel;

    this._updatedAt = new Date();

    return this;
  }

  public updateJoinPeriod(period: number): this {
    this._joinPeriod = period;

    this._updatedAt = new Date();

    return this;
  }

  public addDiscount(discount: number): this {
    if (!this._discounts.includes(discount)) {
      this._discounts.push(discount);
      this._updatedAt = new Date();
    }

    return this;
  }

  public removeDiscount(discount: number): this {
    const initialLength = this._discounts.length;
    this._discounts = this._discounts.filter((d) => d !== discount);

    if (this._discounts.length < initialLength) {
      this._updatedAt = new Date();
    }

    return this;
  }

  public updateParent(parent: number): this {
    this._parent = parent;

    this._updatedAt = new Date();

    return this;
  }

  public delete(): this {
    if (this._deletedAt === null) {
      this._deletedAt = new Date();
      this._updatedAt = this._deletedAt;
    }
    return this;
  }

  public restore(): this {
    if (this._deletedAt !== null) {
      this._deletedAt = null;
      this._updatedAt = new Date();
    }
    return this;
  }
}
