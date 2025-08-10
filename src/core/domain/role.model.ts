export enum Permission {
  SUPER_USER,
  CAN_CREATE_NEW_USERS,
}

export interface Role {
  id: number;
  name: string;
  tier: number;
  permissions: Permission[];
}
