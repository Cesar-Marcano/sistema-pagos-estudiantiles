import { Discount } from "./discount.model";
import { Grade } from "./grade.model";
import { Parent } from "./parent.model";
import { Period } from "./period.model";
import { User } from "./user.model";

export enum StudentStatus {
  Active,
  Inactive,
}

export class Student {
  constructor(
    private _fullname: string,
    private _birthday: Date,
    private _section: string | null,
    private _document: string | null,
    private _status: StudentStatus,

    private _grade: number | Grade,
    private _gradeLevel: number | null,

    private _joinGrade: number | Grade,
    private _joinGradeLevel: number | null,
    private _joinPeriod: number | Period,

    private _discounts: number[] | Discount[],

    private _parent: number | Parent,

    private _createdBy: number | User,

    private readonly _createdAt: Date,
    private _updatedAt: Date,
    private _deletedAt: Date | null,
    private _id?: number
  ) {}

  public static create(
    _fullname: string,
    _birthday: Date,
    _section: string | null,
    _document: string | null,
    _status: StudentStatus,

    _grade: number | Grade,
    _gradeLevel: number | null,

    _joinGrade: number | Grade,
    _joinGradeLevel: number | null,
    _joinPeriod: number | Period,

    _discounts: number[] | Discount[],

    _parent: number | Parent,

    _createdBy: number | User
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
      _discounts,
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

  public get document(): string | null {
    return this._document;
  }

  public get status(): StudentStatus {
    return this._status;
  }

  public get grade(): number | Grade {
    return this._grade;
  }

  public get gradeLevel(): number | null {
    return this._gradeLevel;
  }

  public get joinGrade(): number | Grade {
    return this._joinGrade;
  }

  public get joinGradeLevel(): number | null {
    return this._joinGradeLevel;
  }

  public get joinPeriod(): number | Period {
    return this._joinPeriod;
  }

  public get discounts(): number[] | Discount[] {
    return this._discounts;
  }

  public get parent(): number | Parent {
    return this._parent;
  }

  public get createdBy(): number | User {
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

  public updateDocument(val: string | null): this {
    this._document = val;
    this._updatedAt = new Date();
    return this;
  }

  public updateStatus(val: StudentStatus): this {
    this._status = val;
    this._updatedAt = new Date();
    return this;
  }

  public updateGrade(grade: number | Grade, level: number | null): this {
    this._grade = grade;
    this._gradeLevel = level;
    this._updatedAt = new Date();
    return this;
  }

  public updateJoinGrade(grade: number | Grade, level: number | null): this {
    this._joinGrade = grade;
    this._joinGradeLevel = level;
    this._updatedAt = new Date();
    return this;
  }

  public updateJoinPeriod(period: number | Period): this {
    this._joinPeriod = period;
    this._updatedAt = new Date();
    return this;
  }

  public updateDiscounts(discounts: number[] | Discount[]): this {
    this._discounts = discounts;
    this._updatedAt = new Date();
    return this;
  }

  public updateParent(parent: number | Parent): this {
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
}
