/*
  Warnings:

  - Made the column `name` on table `TbUsers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TbUsers" ALTER COLUMN "name" SET NOT NULL;
