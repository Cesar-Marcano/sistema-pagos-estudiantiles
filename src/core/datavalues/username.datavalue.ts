export class Username {
  constructor(private readonly _value: string) {
    _value = _value.trim();
    
    const regExp = /^(?!.*[_.]{2})[a-z0-9](?:[a-z0-9._]{1,14}[a-z0-9])?$/;

    if (!regExp.test(_value)) {
      throw new Error("Invalid username");
    }
  }

  public get value(): string {
    return this._value;
  }
}
