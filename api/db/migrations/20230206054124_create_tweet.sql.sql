
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE `tweets` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `tweet` VARCHAR(200) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `deleted_at` DATETIME
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE `tweets`;