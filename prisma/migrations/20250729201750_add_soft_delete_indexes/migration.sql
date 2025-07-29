-- User
CREATE UNIQUE INDEX IF NOT EXISTS unique_username_not_deleted
ON "User"(username)
WHERE "deletedAt" IS NULL;

-- Parent
CREATE UNIQUE INDEX IF NOT EXISTS unique_parent_document_not_deleted
ON "Parent"(document)
WHERE "deletedAt" IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS unique_parent_phone_not_deleted
ON "Parent"("phoneNumber")
WHERE "deletedAt" IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS unique_parent_email_not_deleted
ON "Parent"(email)
WHERE "deletedAt" IS NULL;

-- Grade
CREATE UNIQUE INDEX IF NOT EXISTS unique_grade_name_not_deleted
ON "Grade"(name)
WHERE "deletedAt" IS NULL;

-- Student
CREATE UNIQUE INDEX IF NOT EXISTS unique_student_document_not_deleted
ON "Student"(document)
WHERE "deletedAt" IS NULL;

-- Discount
CREATE UNIQUE INDEX IF NOT EXISTS unique_discount_name_not_deleted
ON "Discount"(name)
WHERE "deletedAt" IS NULL;

-- Invoice
CREATE UNIQUE INDEX IF NOT EXISTS unique_invoice_number_not_deleted
ON "Invoice"("invoiceNumber")
WHERE "deletedAt" IS NULL;

-- PaymentMethod
CREATE UNIQUE INDEX IF NOT EXISTS unique_payment_method_name_not_deleted
ON "PaymentMethod"(name)
WHERE "deletedAt" IS NULL;

-- Payment
CREATE UNIQUE INDEX IF NOT EXISTS unique_payment_reference_not_deleted
ON "Payment"("referenceNumber")
WHERE "deletedAt" IS NULL;
