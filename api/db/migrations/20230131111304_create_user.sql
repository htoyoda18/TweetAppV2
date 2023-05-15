-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE `users` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(20),
  `email` VARCHAR(255),
  `password` VARCHAR(100),
  `icon` VARCHAR(255),
  `introduction` VARCHAR(255),
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `deleted_at` DATETIME
);

INSERT INTO 
    `users` (`name`, `email`, `password`, `icon`, `introduction`, `created_at`, `updated_at`) 
VALUES
    ('ウィスパー', '1@example.com', 'ウィスパー.png', 'ニョロロン族 / ウワノソラ族。「190年前、正義を気取った僧により悪者とされ封印された“妖怪執事”」を自称する妖怪。', 'hogehoge', NOW(), NOW()), 
    ('ジバニャン', '2@example.com', 'ジバニャン.png', 'プリチー族 / モノノケ族。トラックに轢かれて死んだ猫が成仏できず、地縛霊となったの赤色のネコ妖怪', 'hogehoge', NOW(), NOW()), 
    ('USAピョン', '3@example.com', 'USAピョン.png', 'ウスラカゲ族 / ウワノソラ族。ゲーム版『3』とアニメ版のセカンドシーズンから登場するメリケン妖怪。', 'hogehoge', NOW(), NOW()), 
    ('コマさん', '4@example.com', 'コマさん.png', 'プリチー族 / オマモリ族。神社の狛犬に憑依した妖怪。一人称は「オラ」で、「〜ズラ」、「もんげー」（岡山弁で「ものすごい」という意味）が口癖。年齢はコマじろうの発言によると、300歳を越えているとのこと。葉っぱを頭に乗せた時には垢抜けない人間の青年として人間に視認されるようになる。必殺技は「ひとだま乱舞」。双子の弟にコマじろうがいるが、弟のコマじろうとは違いに未だに都会慣れしていない。渦巻き柄の入った緑色の風呂敷を背負っており、コマじろうからクリスマスプレゼントとして渡された緑色のがま口のポシェットを、肌身離さず身に着けている。好物はソフトクリーム。', 'hogehoge', NOW(), NOW()), 
    ('コマじろう', '5@example.com', 'コマじろう.png', 'プリチー族 / オマモリ族。コマさんの双子の弟。', 'hogehoge', NOW(), NOW());

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE `users`;