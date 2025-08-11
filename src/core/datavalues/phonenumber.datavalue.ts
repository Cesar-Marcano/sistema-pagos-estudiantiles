export class PhoneNumber {
  constructor(private readonly _value: string) {
    _value = _value.trim();

    const regExp = /^(?:\+58|0)?(412|422|416|426|424|414|212|295)\d{7}$/;

    if (!regExp.test(_value)) {
      throw new Error("Invalid phone number");
    }
  }

  public get value(): string {
    return this._value;
  }
}
