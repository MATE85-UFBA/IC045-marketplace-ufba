/*
  Warnings:

  - You are about to drop the `TbField` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TbTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TbUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ResearcherType" AS ENUM ('STUDENT', 'TEACHER');

-- CreateEnum
CREATE TYPE "NotificationStartedBy" AS ENUM ('RESEARCHGROUP', 'COMPANY');

-- DropTable
DROP TABLE "TbField";

-- DropTable
DROP TABLE "TbTags";

-- DropTable
DROP TABLE "TbUsers";

-- DropEnum
DROP TYPE "UsersRoles";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "resetToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "userId" TEXT NOT NULL,
    "contactName" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Researcher" (
    "userId" TEXT NOT NULL,
    "urlLattes" TEXT,
    "researcherType" "ResearcherType" NOT NULL DEFAULT 'TEACHER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Researcher_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ResearchGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "urlCNPQ" TEXT,
    "img" TEXT,
    "researcherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResearchGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnowledgeArea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KnowledgeArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competence" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "finished_at" TIMESTAMP(3),
    "researchGroupId" TEXT NOT NULL,
    "demandId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Competence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Demand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'CREATED',
    "public" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Demand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "demandId" TEXT NOT NULL,
    "researchGroupId" TEXT NOT NULL,
    "started_by" "NotificationStartedBy" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "demandId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KeywordToCompetence" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ResearchGroupMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_KnowledgeAreaToResearchGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DemandToKeyword" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ResearchGroup_name_key" ON "ResearchGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Competence_name_key" ON "Competence"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_KeywordToCompetence_AB_unique" ON "_KeywordToCompetence"("A", "B");

-- CreateIndex
CREATE INDEX "_KeywordToCompetence_B_index" ON "_KeywordToCompetence"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ResearchGroupMembers_AB_unique" ON "_ResearchGroupMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_ResearchGroupMembers_B_index" ON "_ResearchGroupMembers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_KnowledgeAreaToResearchGroup_AB_unique" ON "_KnowledgeAreaToResearchGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_KnowledgeAreaToResearchGroup_B_index" ON "_KnowledgeAreaToResearchGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DemandToKeyword_AB_unique" ON "_DemandToKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_DemandToKeyword_B_index" ON "_DemandToKeyword"("B");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Researcher" ADD CONSTRAINT "Researcher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearchGroup" ADD CONSTRAINT "ResearchGroup_researcherId_fkey" FOREIGN KEY ("researcherId") REFERENCES "Researcher"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competence" ADD CONSTRAINT "Competence_researchGroupId_fkey" FOREIGN KEY ("researchGroupId") REFERENCES "ResearchGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competence" ADD CONSTRAINT "Competence_demandId_fkey" FOREIGN KEY ("demandId") REFERENCES "Demand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_demandId_fkey" FOREIGN KEY ("demandId") REFERENCES "Demand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_researchGroupId_fkey" FOREIGN KEY ("researchGroupId") REFERENCES "ResearchGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_demandId_fkey" FOREIGN KEY ("demandId") REFERENCES "Demand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordToCompetence" ADD CONSTRAINT "_KeywordToCompetence_A_fkey" FOREIGN KEY ("A") REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordToCompetence" ADD CONSTRAINT "_KeywordToCompetence_B_fkey" FOREIGN KEY ("B") REFERENCES "Competence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResearchGroupMembers" ADD CONSTRAINT "_ResearchGroupMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "ResearchGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResearchGroupMembers" ADD CONSTRAINT "_ResearchGroupMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "Researcher"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KnowledgeAreaToResearchGroup" ADD CONSTRAINT "_KnowledgeAreaToResearchGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "KnowledgeArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KnowledgeAreaToResearchGroup" ADD CONSTRAINT "_KnowledgeAreaToResearchGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "ResearchGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemandToKeyword" ADD CONSTRAINT "_DemandToKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Demand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemandToKeyword" ADD CONSTRAINT "_DemandToKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;
