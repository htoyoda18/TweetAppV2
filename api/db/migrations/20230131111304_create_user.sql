-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE `users` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `icon` VARCHAR(255),
  `introduction` VARCHAR(255),
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `deleted_at` DATETIME
);

INSERT INTO 
    `users` (`name`, `email`, `icon`, `introduction`, `password`, `created_at`, `updated_at`) 
VALUES
    ('ウィスパー', '1@example.com', 'ウィスパー.png', 'ニョロロン族 / ウワノソラ族。「190年前、正義を気取った僧により悪者とされ封印された“妖怪執事”」を自称する妖怪。', '$2a$10$RQksNR0wn9SzOkVwXyfG2eotJ6ckENaUBI8qpMZSRcZIcbYnT/l12', NOW(), NOW()), 
    ('ジバニャン', '2@example.com', 'ジバニャン.png', 'プリチー族 / モノノケ族。トラックに轢かれて死んだ猫が成仏できず、地縛霊となったの赤色のネコ妖怪', '$2a$10$RQksNR0wn9SzOkVwXyfG2eotJ6ckENaUBI8qpMZSRcZIcbYnT/l12', NOW(), NOW()), 
    ('USAピョン', '3@example.com', 'USAピョン.png', 'ウスラカゲ族 / ウワノソラ族。ゲーム版『3』とアニメ版のセカンドシーズンから登場するメリケン妖怪。', '$2a$10$RQksNR0wn9SzOkVwXyfG2eotJ6ckENaUBI8qpMZSRcZIcbYnT/l12', NOW(), NOW()), 
    ('コマさん', '4@example.com', 'コマさん.png', 'プリチー族 / オマモリ族。神社の狛犬に憑依した妖怪。一人称は「オラ」で、「〜ズラ」、「もんげー」（岡山弁で「ものすごい」という意味）が口癖。', '$2a$10$RQksNR0wn9SzOkVwXyfG2eotJ6ckENaUBI8qpMZSRcZIcbYnT/l12', NOW(), NOW()), 
    ('コマじろう', '5@example.com', 'コマじろう.png', 'プリチー族 / オマモリ族。コマさんの双子の弟。', '$2a$10$RQksNR0wn9SzOkVwXyfG2eotJ6ckENaUBI8qpMZSRcZIcbYnT/l12', NOW(), NOW());

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE `users`;