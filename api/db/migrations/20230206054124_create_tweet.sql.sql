-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE `tweets` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `tweet` VARCHAR(200) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `deleted_at` DATETIME,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

INSERT INTO
    `tweets` (`user_id`, `tweet`, `created_at`, `updated_at`)
VALUES
    (1, 'うぃっす!', NOW(), NOW()),
    (1, 'ワタクシは妖怪執事のウィスパー！', NOW(), NOW()),
    (2, '友達だからって都合よく働く気分になるわけじゃないニャン', NOW(), NOW()),
    (2, 'プリチー！ オレッチ！トモダチ！ ふくわウチー！', NOW(), NOW()),
    (3, '宇宙人ではなく、妖怪ダニ！', NOW(), NOW()),
    (3, 'だから話を聞けっつってんダニ！', NOW(), NOW()),
    (4, '困ったズラ…困ったズラぁ…', NOW(), NOW()),
    (4, 'ズラ？', NOW(), NOW()),
    (4, 'もんげ～！！', NOW(), NOW()),
    (5, 'もんげ～！！', NOW(), NOW()),
    (5, 'さっすが兄ちゃんズラ！！！！', NOW(), NOW());

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE `tweets`;