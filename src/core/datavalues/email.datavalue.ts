export class Email {
  constructor(private readonly _value: string) {
    _value = _value.trim();

    const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regExp.test(_value)) {
      throw new Error("Invalid email");
    }
  }

  public get value(): string {
    return this._value;
  }
}
