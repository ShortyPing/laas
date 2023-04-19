/*
  Warnings:

  - You are about to drop the column `activate` on the `License` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "License" DROP COLUMN "activate",
ADD COLUMN     "activated" BOOLEAN NOT NULL DEFAULT true;
