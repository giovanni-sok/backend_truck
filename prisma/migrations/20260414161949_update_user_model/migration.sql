/*
  Warnings:

  - A unique constraint covering the columns `[telephone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nom` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prenom` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CLIENT', 'CHAUFFEUR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nom" TEXT NOT NULL,
ADD COLUMN     "prenom" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CLIENT',
ADD COLUMN     "telephone" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_telephone_key" ON "User"("telephone");
