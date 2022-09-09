/*
  Warnings:

  - Added the required column `price_installment` to the `installments_service_provided` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `installments_service_provided` ADD COLUMN `price_installment` DOUBLE NOT NULL;
