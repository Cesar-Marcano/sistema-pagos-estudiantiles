export class Session {
  constructor(
    private _jti: string,
    private _user: number,

    private readonly _createdAt: Date,
    private readonly _id?: number
  ) {}

  public static create(_jti: string, _user: number): Session {
    return new Session(_jti, _user, new Date());
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get jti(): string {
    return this._jti;
  }

  public get user(): number {
    return this._user;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }
}
