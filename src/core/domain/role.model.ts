export enum Permission {
  SUPER_USER,
  CAN_CREATE_NEW_USERS,
}

export class Role {
  private constructor(
    private _name: string,
    private _tier: number,
    private _permissions: Permission[],

    private readonly _createdAt: Date,
    private _updatedAt: Date,
    private _deletedAt: Date | null,
    private readonly _id?: number
  ) {
    if (_name.trim().length < 1) {
      throw new Error("The name should not be blank.");
    }
    if (_tier < 0) {
      throw new Error("Tier should be greater or equal than 0");
    }
    this._name = _name.trim().toUpperCase();
  }

  public static create(_name: string, _tier: number): Role {
    const now = new Date();

    return new Role(_name, _tier, [], now, now, null);
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get tier(): number {
    return this._tier;
  }

  public get permissions(): Permission[] {
    return [...this._permissions];
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

  public addPermission(permission: Permission): this {
    if (this._permissions.includes(permission)) {
      throw new Error("Permission already added");
    }

    this._permissions.push(permission);

    this._updatedAt = new Date();

    return this;
  }

  public removePermission(permission: Permission): this {
    const index = this._permissions.indexOf(permission);
    if (index === -1) {
      throw new Error("Permission not found for removal");
    }

    this._permissions.splice(index, 1);
    this._updatedAt = new Date();

    return this;
  }

  public updateName(name: string): this {
    if (name.trim().length < 1) {
      throw new Error("The name should not be blank.");
    }

    this._name = name.trim().toUpperCase();

    this._updatedAt = new Date();

    return this;
  }

  public updateTier(tier: number): this {
    if (tier < 0) {
      throw new Error("Tier should be greater or equal than 0");
    }

    this._tier = tier;

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
