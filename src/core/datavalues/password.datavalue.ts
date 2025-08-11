export class Password {
  constructor(private readonly _value: string) {
    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;

    if (!regExp.test(_value)) {
      throw new Error("Weak password");
    }
  }

  public get value(): string {
    return this._value;
  }
}
