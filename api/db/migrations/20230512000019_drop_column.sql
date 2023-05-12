
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
ALTER TABLE `tweets` DROP COLUMN `like`;

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
ALTER TABLE `tweets` ADD COLUMN `like` INT NOT NULL;
