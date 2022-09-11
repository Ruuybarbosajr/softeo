-- DropForeignKey
ALTER TABLE `installments_service_provided` DROP FOREIGN KEY `installments_service_provided_service_provided_id_fkey`;

-- DropForeignKey
ALTER TABLE `services_provided` DROP FOREIGN KEY `services_provided_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `services_provided` DROP FOREIGN KEY `services_provided_service_id_fkey`;

-- AlterTable
ALTER TABLE `services_provided` MODIFY `client_id` VARCHAR(191) NOT NULL DEFAULT 'removed',
    MODIFY `service_id` VARCHAR(191) NOT NULL DEFAULT 'removed';

-- AddForeignKey
ALTER TABLE `installments_service_provided` ADD CONSTRAINT `installments_service_provided_service_provided_id_fkey` FOREIGN KEY (`service_provided_id`) REFERENCES `services_provided`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `services_provided` ADD CONSTRAINT `services_provided_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `services_provided` ADD CONSTRAINT `services_provided_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
