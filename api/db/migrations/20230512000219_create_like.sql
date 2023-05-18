-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE `likes` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `tweet_id` INT NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `deleted_at` DATETIME,
    UNIQUE (`user_id`, `tweet_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`tweet_id`) REFERENCES `tweets`(`id`)
);

INSERT INTO 
    `likes` (`user_id`, `tweet_id`, `created_at`, `updated_at`, `deleted_at`)
VALUES
    (1, 1, NOW(), NOW(), NULL),
    (1, 2, NOW(), NOW(), NULL),
    (1, 3, NOW(), NOW(), NULL),
    (2, 4, NOW(), NOW(), NULL),
    (2, 5, NOW(), NOW(), NULL),
    (2, 6, NOW(), NOW(), NULL),
    (3, 7, NOW(), NOW(), NULL),
    (3, 8, NOW(), NOW(), NULL),
    (3, 9, NOW(), NOW(), NULL),
    (4, 10, NOW(), NOW(), NULL),
    (4, 11, NOW(), NOW(), NULL),
    (4, 1, NOW(), NOW(), NULL),
    (5, 2, NOW(), NOW(), NULL),
    (5, 3, NOW(), NOW(), NULL),
    (5, 4, NOW(), NOW(), NULL),
    (4, 2, NOW(), NOW(), NULL),
    (4, 3, NOW(), NOW(), NULL),
    (4, 4, NOW(), NOW(), NULL),
    (4, 5, NOW(), NOW(), NULL),
    (4, 6, NOW(), NOW(), NULL);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE `likes`;