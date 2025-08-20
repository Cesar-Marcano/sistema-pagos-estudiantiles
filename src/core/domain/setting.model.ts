export class Setting {
  constructor(
    private _name: string,
    private _value: string,
    private readonly _id?: number
  ) {}

  public static create(_name: string, _value: string): Setting {
    if (_value.trim().length < 1) {
      throw new Error("Empty setting value");
    }

    return new Setting(_name, _value);
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get value(): string {
    return this._value;
  }

  public get name(): string {
    return this._name;
  }

  public updateValue(val: string): this {
    const settingVal = val.trim();
    if (settingVal.length < 1) {
      throw new Error("Empty setting value");
    }

    this._value = settingVal;

    return this;
  }
}
