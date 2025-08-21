import { PaymentMethod } from "../../../../src/core/domain/paymentMethod.model";

describe("PaymentMethod model", () => {
  let paymentMethod: PaymentMethod;
  const createdBy = 1;

  beforeEach(() => {
    paymentMethod = PaymentMethod.create(
      "Credit Card",
      "Payment via credit card",
      false,
      true,
      createdBy
    );
  });

  describe("PaymentMethod creation", () => {
    it("should create a new payment method with correct default properties", () => {
      expect(paymentMethod.name).toBe("Credit Card");
      expect(paymentMethod.description).toBe("Payment via credit card");
      expect(paymentMethod.requiresManualVerification).toBe(false);
      expect(paymentMethod.requiresReferenceNumber).toBe(true);
      expect(paymentMethod.createdBy).toBe(createdBy);
      expect(paymentMethod.createdAt).toBeInstanceOf(Date);
      expect(paymentMethod.updatedAt).toBe(paymentMethod.createdAt);
      expect(paymentMethod.deletedAt).toBeNull();
    });

    it("should trim name and description", () => {
      const pm = PaymentMethod.create(
        "  Cash  ",
        "  Manual payment  ",
        false,
        false,
        createdBy
      );
      expect(pm.name).toBe("Cash");
      expect(pm.description).toBe("Manual payment");
    });

    it("should throw error for invalid name", () => {
      expect(() =>
        PaymentMethod.create("A", "Valid description", false, false, createdBy)
      ).toThrow("Invalid name");
    });

    it("should throw error for invalid description", () => {
      expect(() =>
        PaymentMethod.create("Valid Name", "A", false, false, createdBy)
      ).toThrow("Invalid description");
    });
  });

  describe("Property updates", () => {
    it("should update name", () => {
      const oldUpdatedAt = paymentMethod.updatedAt;
      paymentMethod.updateName("New Name");
      expect(paymentMethod.name).toBe("New Name");
      expect(paymentMethod.updatedAt).not.toBe(oldUpdatedAt);
    });

    it("should throw on invalid name update", () => {
      expect(() => paymentMethod.updateName("A")).toThrow("Invalid name");
    });

    it("should update description", () => {
      const oldUpdatedAt = paymentMethod.updatedAt;
      paymentMethod.updateDescription("New Description");
      expect(paymentMethod.description).toBe("New Description");
      expect(paymentMethod.updatedAt).not.toBe(oldUpdatedAt);
    });

    it("should throw on invalid description update", () => {
      expect(() => paymentMethod.updateDescription("A")).toThrow(
        "Invalid description"
      );
    });

    it("should update requiresManualVerification only if value changes", () => {
      const oldUpdatedAt = paymentMethod.updatedAt;
      paymentMethod.updateRequiresManualVerification(true);
      expect(paymentMethod.requiresManualVerification).toBe(true);
      expect(paymentMethod.updatedAt).not.toBe(oldUpdatedAt);

      const updatedAtBefore = paymentMethod.updatedAt;
      paymentMethod.updateRequiresManualVerification(true);
      expect(paymentMethod.updatedAt).toBe(updatedAtBefore); // no change
    });

    it("should update requiresReferenceNumber only if value changes", () => {
      const oldUpdatedAt = paymentMethod.updatedAt;
      paymentMethod.updateRequiresReferenceNumber(false);
      expect(paymentMethod.requiresReferenceNumber).toBe(false);
      expect(paymentMethod.updatedAt).not.toBe(oldUpdatedAt);

      const updatedAtBefore = paymentMethod.updatedAt;
      paymentMethod.updateRequiresReferenceNumber(false);
      expect(paymentMethod.updatedAt).toBe(updatedAtBefore); // no change
    });
  });

  describe("Deletion and restoration", () => {
    let oldUpdatedAt: Date;

    beforeEach(() => {
      oldUpdatedAt = paymentMethod.updatedAt;
      paymentMethod.delete();
    });

    it("should delete the payment method", () => {
      expect(paymentMethod.deletedAt).not.toBeNull();
      expect(paymentMethod.updatedAt).not.toBe(oldUpdatedAt);
    });

    it("should restore the payment method", () => {
      const oldUpdatedAtAfterDelete = paymentMethod.updatedAt;
      paymentMethod.restore();
      expect(paymentMethod.deletedAt).toBeNull();
      expect(paymentMethod.updatedAt).not.toBe(oldUpdatedAtAfterDelete);
    });

    it("should not delete if already deleted", () => {
      const updatedAtBeforeSecondDelete = paymentMethod.updatedAt;
      paymentMethod.delete();
      expect(paymentMethod.deletedAt).toBe(updatedAtBeforeSecondDelete);
      expect(paymentMethod.updatedAt).toBe(updatedAtBeforeSecondDelete);
    });

    it("should not restore if not deleted", () => {
      const pm = PaymentMethod.create(
        "Bank Transfer",
        null,
        false,
        false,
        createdBy
      );
      const initialUpdatedAt = pm.updatedAt;
      pm.restore();
      expect(pm.deletedAt).toBeNull();
      expect(pm.updatedAt).toBe(initialUpdatedAt);
    });
  });
});
