export class Password {
  constructor(private readonly _value: string) {
    const regExp =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}:;\'"?/<,.~`|\\\]\[-])(?=.{8,})/;

    if (!regExp.test(_value)) {
      throw new Error("Weak password");
    }
  }

  public get value(): string {
    return this._value;
  }
}
