-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE `likes` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `tweet_id` INT NOT NULL,
    `created_at` DATETIME NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`tweet_id`) REFERENCES `tweets`(`id`),
    `deleted_at` DATETIME
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE `likes`;