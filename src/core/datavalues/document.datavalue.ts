export class IdentificationDocument {
  constructor(private readonly _value: string) {
    _value = _value.trim();

    const regExp = /^(?:[VE]-\d{6,8}|P-[a-zA-Z0-9]{6,12})$/;

    if (!regExp.test(_value)) {
      throw new Error("Invalid identification document");
    }
  }

  public get value(): string {
    return this._value;
  }
}
