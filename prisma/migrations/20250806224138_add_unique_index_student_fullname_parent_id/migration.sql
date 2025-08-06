/*
  Warnings:

  - You are about to drop the column `studentId` on the `Discount` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Discount" DROP CONSTRAINT "Discount_studentId_fkey";

-- AlterTable
ALTER TABLE "Discount" DROP COLUMN "studentId";

-- CreateTable
CREATE TABLE "_StudentDiscounts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_StudentDiscounts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_StudentDiscounts_B_index" ON "_StudentDiscounts"("B");

-- AddForeignKey
ALTER TABLE "_StudentDiscounts" ADD CONSTRAINT "_StudentDiscounts_A_fkey" FOREIGN KEY ("A") REFERENCES "Discount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentDiscounts" ADD CONSTRAINT "_StudentDiscounts_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateIndex
CREATE UNIQUE INDEX unique_student_fullname_parentId_not_deleted
ON "Student" (fullname, "parentId")
WHERE "deletedAt" IS NULL;
