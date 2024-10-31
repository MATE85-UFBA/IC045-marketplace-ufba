/*
  Warnings:

  - You are about to drop the `TbUsuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UsersRoles" AS ENUM ('USER', 'ADMIN');

-- DropTable
DROP TABLE "TbUsuario";

-- CreateTable
CREATE TABLE "TbUsers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "img" TEXT,
    "password" TEXT NOT NULL,
    "role" "UsersRoles" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TbUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TbUsers_email_key" ON "TbUsers"("email");
