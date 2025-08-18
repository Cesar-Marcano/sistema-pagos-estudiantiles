export enum Permission {
  // General
  SUPER_USER = "SUPER_USER",
  CAN_SEARCH_DELETED = "CAN_SEARCH_DELETED",

  //Create
  CAN_CREATE_NEW_USERS = "CAN_CREATE_NEW_USERS",
  CAN_CREATE_NEW_PARENTS = "CAN_CREATE_NEW_PARENTS",
  CAN_CREATE_NEW_STUDENTS = "CAN_CREATE_NEW_STUDENTS",
  CAN_CREATE_NEW_GRADES = "CAN_CREATE_NEW_GRADES",
  CAN_CREATE_NEW_PAYMENTS = "CAN_CREATE_NEW_PAYMENTS",
  CAN_CREATE_NEW_PAYMENT_METHODS = "CAN_CREATE_NEW_PAYMENT_METHODS",
  CAN_CREATE_NEW_PERIODS = "CAN_CREATE_NEW_PERIODS",
  CAN_CREATE_NEW_ROLES = "CAN_CREATE_NEW_ROLES",
  CAN_CREATE_NEW_INVOICES = "CAN_CREATE_NEW_INVOICES",
  CAN_CREATE_NEW_DISCOUNTS = "CAN_CREATE_NEW_DISCOUNTS",

  // Query
  CAN_SEARCH_USERS = "CAN_SEARCH_USERS",
  CAN_SEARCH_PARENTS = "CAN_SEARCH_PARENTS",
  CAN_SEARCH_STUDENTS = "CAN_SEARCH_STUDENTS",
  CAN_SEARCH_GRADES = "CAN_SEARCH_GRADES",
  CAN_SEARCH_PAYMENTS = "CAN_SEARCH_PAYMENTS",
  CAN_SEARCH_PAYMENT_METHODS = "CAN_SEARCH_PAYMENT_METHODS",
  CAN_SEARCH_PERIODS = "CAN_SEARCH_PERIODS",
  CAN_SEARCH_ROLES = "CAN_SEARCH_ROLES",
  CAN_SEARCH_INVOICES = "CAN_SEARCH_INVOICES",
  CAN_SEARCH_DISCOUNTS = "CAN_SEARCH_DISCOUNTS",

  // Update
  CAN_UPDATE_USERS = "CAN_UPDATE_USERS",
  CAN_UPDATE_PARENTS = "CAN_UPDATE_PARENTS",
  CAN_UPDATE_STUDENTS = "CAN_UPDATE_STUDENTS",
  CAN_UPDATE_GRADES = "CAN_UPDATE_GRADES",
  CAN_UPDATE_PAYMENTS = "CAN_UPDATE_PAYMENTS",
  CAN_UPDATE_PAYMENT_METHODS = "CAN_UPDATE_PAYMENT_METHODS",
  CAN_UPDATE_PERIODS = "CAN_UPDATE_PERIODS",
  CAN_UPDATE_ROLES = "CAN_UPDATE_ROLES",
  CAN_UPDATE_INVOICES = "CAN_UPDATE_INVOICES",
  CAN_UPDATE_DISCOUNTS = "CAN_UPDATE_DISCOUNTS",

  // Delete
  CAN_DELETE_USERS = "CAN_DELETE_USERS",
  CAN_DELETE_PARENTS = "CAN_DELETE_PARENTS",
  CAN_DELETE_STUDENTS = "CAN_DELETE_STUDENTS",
  CAN_DELETE_GRADES = "CAN_DELETE_GRADES",
  CAN_DELETE_PAYMENTS = "CAN_DELETE_PAYMENTS",
  CAN_DELETE_PAYMENT_METHODS = "CAN_DELETE_PAYMENT_METHODS",
  CAN_DELETE_PERIODS = "CAN_DELETE_PERIODS",
  CAN_DELETE_ROLES = "CAN_DELETE_ROLES",
  CAN_DELETE_INVOICES = "CAN_DELETE_INVOICES",
  CAN_DELETE_DISCOUNTS = "CAN_DELETE_DISCOUNTS",
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
