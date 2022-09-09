-- CreateTable
CREATE TABLE `installments_service_provided` (
    `service_provided_id` VARCHAR(191) NOT NULL,
    `number_installment` INTEGER NOT NULL,
    `date_installment` DATETIME(3) NOT NULL,

    UNIQUE INDEX `installments_service_provided_service_provided_id_key`(`service_provided_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `installments_service_provided` ADD CONSTRAINT `installments_service_provided_service_provided_id_fkey` FOREIGN KEY (`service_provided_id`) REFERENCES `services_provided`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
