/*
  Warnings:

  - You are about to drop the column `name` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Plant` table. All the data in the column will be lost.
  - Added the required column `commonname` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disease` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `family` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genus` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isleaf` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rarity` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scientificname` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `species` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "name",
DROP COLUMN "type",
ADD COLUMN     "commonname" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "disease" TEXT NOT NULL,
ADD COLUMN     "family" TEXT NOT NULL,
ADD COLUMN     "genus" TEXT NOT NULL,
ADD COLUMN     "isleaf" BOOLEAN NOT NULL,
ADD COLUMN     "rarity" TEXT NOT NULL,
ADD COLUMN     "scientificname" TEXT NOT NULL,
ADD COLUMN     "species" TEXT NOT NULL;
