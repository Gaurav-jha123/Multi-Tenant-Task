-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('CREATED', 'COMPLETED');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'CREATED';
