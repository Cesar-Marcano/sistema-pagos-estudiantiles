import { Invoice } from "./invoice.model";
import { PaymentMethod } from "./paymentMethod.model";
import { User } from "./user.model";

interface BasePayment {
  id: number;
  amount: number;
  denied: boolean;
  notes?: string;

  paymentMethod: number | PaymentMethod;

  invoice: number | Invoice;

  verified?: boolean;
  verifiedAt?: Date;
  verifiedBy?: number | User;

  referenceNumber?: string;

  createdBy: number | User;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface PaymentFullControl extends BasePayment {
  paymentMethod:
    | number
    | (PaymentMethod & {
        requiresManualVerification: true;
        requiresReferenceNumber: true;
      });
  verified: boolean;
  verifiedAt: Date;
  verifiedBy: number | User;
  referenceNumber: string;
}

export interface PaymentWithVerification extends BasePayment {
  paymentMethod:
    | number
    | (PaymentMethod & {
        requiresManualVerification: true;
        requiresReferenceNumber: false;
      });
  verified: boolean;
  verifiedAt: Date;
  verifiedBy: number | User;
  referenceNumber?: never;
}

export interface PaymentWithReference extends BasePayment {
  paymentMethod:
    | number
    | (PaymentMethod & {
        requiresManualVerification: false;
        requiresReferenceNumber: true;
      });
  verified?: never;
  verifiedAt?: never;
  verifiedBy?: never;
  referenceNumber: string;
}

export interface PaymentWithoutControls extends BasePayment {
  paymentMethod:
    | number
    | (PaymentMethod & {
        requiresManualVerification: false;
        requiresReferenceNumber: false;
      });
  verified?: never;
  verifiedAt?: never;
  verifiedBy?: never;
  referenceNumber?: never;
}

export type Payment =
  | PaymentFullControl
  | PaymentWithVerification
  | PaymentWithReference
  | PaymentWithoutControls;
