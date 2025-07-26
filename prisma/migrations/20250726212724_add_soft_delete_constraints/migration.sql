/*
  Warnings:

  - A unique constraint covering the columns `[name,deletedAt]` on the table `Discount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,deletedAt]` on the table `Grade` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoiceNumber,deletedAt]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[document,deletedAt]` on the table `Parent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber,deletedAt]` on the table `Parent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,deletedAt]` on the table `Parent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[referenceNumber,deletedAt]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,deletedAt]` on the table `PaymentMethod` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[document,deletedAt]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username,deletedAt]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Discount_name_key";

-- DropIndex
DROP INDEX "Grade_name_key";

-- DropIndex
DROP INDEX "Invoice_invoiceNumber_key";

-- DropIndex
DROP INDEX "Payment_referenceNumber_key";

-- DropIndex
DROP INDEX "PaymentMethod_name_key";

-- DropIndex
DROP INDEX "Student_document_key";

-- DropIndex
DROP INDEX "User_username_key";

-- CreateIndex
CREATE UNIQUE INDEX "Discount_name_deletedAt_key" ON "Discount"("name", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Grade_name_deletedAt_key" ON "Grade"("name", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_deletedAt_key" ON "Invoice"("invoiceNumber", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_document_deletedAt_key" ON "Parent"("document", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_phoneNumber_deletedAt_key" ON "Parent"("phoneNumber", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_email_deletedAt_key" ON "Parent"("email", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_referenceNumber_deletedAt_key" ON "Payment"("referenceNumber", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_name_deletedAt_key" ON "PaymentMethod"("name", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Student_document_deletedAt_key" ON "Student"("document", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_deletedAt_key" ON "User"("username", "deletedAt");
