-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE `replies` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `tweet_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `reply` VARCHAR(200) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `deleted_at` DATETIME
);

INSERT INTO 
    `replies` (`tweet_id`, `user_id`, `reply`, `created_at`, `updated_at`)
VALUES
    (1, 2, 'ニャン', NOW(), NOW()),
    (1, 4, 'ズラ！', NOW(), NOW()),
    (1, 3, 'ダニ！', NOW(), NOW()),
    (3, 5, 'そうズラね', NOW(), NOW()),
    (3, 1, 'そうですね', NOW(), NOW()),
    (5, 2, 'そうだったニャンね', NOW(), NOW()),
    (7, 3, '大丈夫ダニ？？', NOW(), NOW()),
    (9, 5, '兄ちゃん何かあったズラ？', NOW(), NOW()),
    (11, 4, 'ありがとうズラ!', NOW(), NOW());


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE `replies`;