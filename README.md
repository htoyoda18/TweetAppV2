# TweetAppV2

## Setup
下記の2つのコマンドを使用して、envファイルを作成してください
```
touch api/.env && echo "JWTKEY=462555db-3fd9-e8b5-b7cc-f87b3c59a2b5" >> api/.env
```
```
touch api/db/.env && echo -e "MYSQL_DATABASE=test_database\nMYSQL_USER=test_user\nMYSQL_PASSWORD=password\nMYSQL_ROOT_PASSWORD=root_password" >> api/db/.env
```
下記のコマンドを実行して、APIのセットアップをします
```
cd api && make setup && cd ../
```
下記のコマンドを実行して、node_modulesをインストールしてください
```
cd front && yarn
```
下記のコマンドを実行して、Next.js アプリケーションを実行してください
```
yarn next
```



## 機能一覧
- ログイン機能
- ユーザ登録機能
- パスワードリセット機能
    - パスワードリセットのメールが飛ぶようになっている(http://localhost:8025/)
- ツイート閲覧機能
- ツイート投稿機能
- ツイートいいね機能
- ツイート返信機能
- ツイート詳細閲覧機能
- ユーザ詳細閲覧機能
- プロフィール編集機能
    - アイコン、自己紹介、ユーザ名が変更出来る

## fronのディレクトリ構成
```
.
├── api
│   ├── client  // APIクライアントがあります。まだ、pagesにAPIクライアントが残ってますが、最終的には全て切り出したいです。
│   └── type    // APIから返ってくるレスポンスのデータ型を定義しています。
├── component   // pagesで使われているコンポーネントです。
├── css         // cssファイルが入ってます。stylesにディレクトリ名を変更する予定です。
├── libs
│   ├── client  // axiosを使いhttpクラインアントを作っています
│   └── hook    // フック処理が入ってます。現状は、tokenの有効性を確認するフックがあります。
├── pages       // ページコンポーネントが入ってます
├── public      // タブで使っているアイコンの画像を格納しています
└── shared      // sharedとして使いたい定数化したエラーメッセージなど入れてます。libsとまとめても良いかも？
```
