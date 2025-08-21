import { Role, Permission } from "../../../../src/core/domain/role.model";

describe("Role model", () => {
  let role: Role;

  beforeEach(() => {
    role = Role.create("admin", 1);
  });

  describe("Role creation", () => {
    it("should create a new role with correct default properties", () => {
      expect(role.createdAt).toBeInstanceOf(Date);
      expect(role.updatedAt).toBe(role.createdAt);
      expect(role.deletedAt).toBeNull();
      expect(role.name).toBe("ADMIN");
      expect(role.tier).toBe(1);
      expect(role.permissions).toEqual([]);
    });

    it("should throw error when name is blank", () => {
      expect(() => Role.create("   ", 0)).toThrow(
        "The name should not be blank."
      );
    });

    it("should throw error when tier is negative", () => {
      expect(() => Role.create("User", -1)).toThrow(
        "Tier should be greater or equal than 0"
      );
    });
  });

  describe("Permission handling", () => {
    it("should add a permission", () => {
      const oldUpdatedAt = role.updatedAt;
      role.addPermission(Permission.CAN_CREATE_NEW_USERS);
      expect(role.permissions).toContain(Permission.CAN_CREATE_NEW_USERS);
      expect(role.updatedAt.getTime()).toBeGreaterThan(oldUpdatedAt.getTime());
    });

    it("should throw if adding the same permission twice", () => {
      role.addPermission(Permission.CAN_CREATE_NEW_USERS);
      expect(() => role.addPermission(Permission.CAN_CREATE_NEW_USERS)).toThrow(
        "Permission already added"
      );
    });

    it("should remove a permission", () => {
      role.addPermission(Permission.CAN_CREATE_NEW_USERS);
      const oldUpdatedAt = role.updatedAt;
      role.removePermission(Permission.CAN_CREATE_NEW_USERS);
      expect(role.permissions).not.toContain(Permission.CAN_CREATE_NEW_USERS);
      expect(role.updatedAt.getTime()).toBeGreaterThan(oldUpdatedAt.getTime());
    });

    it("should throw if removing a permission that does not exist", () => {
      expect(() => role.removePermission(Permission.CAN_DELETE_USERS)).toThrow(
        "Permission not found for removal"
      );
    });

    it("should check if role has a permission", () => {
      role.addPermission(Permission.CAN_CREATE_NEW_USERS);
      expect(role.hasPermission(Permission.CAN_CREATE_NEW_USERS)).toBeTruthy();
      expect(role.hasPermission(Permission.CAN_DELETE_USERS)).toBeFalsy();
    });
  });

  describe("Updates", () => {
    it("should update the name", () => {
      const oldUpdatedAt = role.updatedAt;
      role.updateName("super admin");
      expect(role.name).toBe("SUPER ADMIN");
      expect(role.updatedAt.getTime()).toBeGreaterThan(oldUpdatedAt.getTime());
    });

    it("should throw when updating with blank name", () => {
      expect(() => role.updateName("   ")).toThrow(
        "The name should not be blank."
      );
    });

    it("should update the tier", () => {
      const oldUpdatedAt = role.updatedAt;
      role.updateTier(5);
      expect(role.tier).toBe(5);
      expect(role.updatedAt.getTime()).toBeGreaterThan(oldUpdatedAt.getTime());
    });

    it("should throw when updating with negative tier", () => {
      expect(() => role.updateTier(-2)).toThrow(
        "Tier should be greater or equal than 0"
      );
    });
  });

  describe("Role deletion and restoration", () => {
    let oldUpdatedAt: Date;

    beforeEach(() => {
      oldUpdatedAt = role.updatedAt;
      role.delete();
    });

    it("should delete the role", () => {
      expect(role.deletedAt).not.toBeNull();
      expect(role.updatedAt.getTime()).toBeGreaterThan(oldUpdatedAt.getTime());
    });

    it("should restore the role", () => {
      const deletedAt = role.deletedAt;
      role.restore();
      expect(role.deletedAt).toBeNull();
      expect(role.updatedAt.getTime()).toBeGreaterThan(deletedAt!.getTime());
    });

    it("should not delete again if already deleted", () => {
      const updatedAtBeforeSecondDelete = role.updatedAt;
      role.delete();
      expect(role.deletedAt).toEqual(updatedAtBeforeSecondDelete);
      expect(role.updatedAt).toBe(updatedAtBeforeSecondDelete);
    });

    it("should not restore if it was never deleted", () => {
      const activeRole = Role.create("moderator", 2);
      const initialUpdatedAt = activeRole.updatedAt;
      activeRole.restore();
      expect(activeRole.deletedAt).toBeNull();
      expect(activeRole.updatedAt).toBe(initialUpdatedAt);
    });
  });
});
