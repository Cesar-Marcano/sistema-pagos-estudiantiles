/*
  Warnings:

  - Made the column `parentId` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_parentId_fkey";

-- DropIndex
DROP INDEX "Discount_name_deletedAt_key";

-- DropIndex
DROP INDEX "Grade_name_deletedAt_key";

-- DropIndex
DROP INDEX "Invoice_invoiceNumber_deletedAt_key";

-- DropIndex
DROP INDEX "Parent_document_deletedAt_key";

-- DropIndex
DROP INDEX "Parent_email_deletedAt_key";

-- DropIndex
DROP INDEX "Parent_phoneNumber_deletedAt_key";

-- DropIndex
DROP INDEX "Payment_referenceNumber_deletedAt_key";

-- DropIndex
DROP INDEX "PaymentMethod_name_deletedAt_key";

-- DropIndex
DROP INDEX "Student_document_deletedAt_key";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "parentId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
