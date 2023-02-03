
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE `users` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(20),
  `email` VARCHAR(255),
  `Password` VARCHAR(100),
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `deleted_at` DATETIME
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE `users`;
