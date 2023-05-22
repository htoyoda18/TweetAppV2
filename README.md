# TweetAppV2

## Setup
1. 下記の2つのコマンドを使用して、envファイルを作成してください
```
touch api/.env && echo "JWTKEY=462555db-3fd9-e8b5-b7cc-f87b3c59a2b5" >> api/.env
```
```
touch api/db/.env && echo -e "MYSQL_DATABASE=test_database\nMYSQL_USER=test_user\nMYSQL_PASSWORD=password\nMYSQL_ROOT_PASSWORD=root_password" >> api/db/.env
```
2. 下記のコマンドを実行して、APIのセットアップをします
```
cd api && make setup && cd ../
```
3. 下記のコマンドを実行して、node_modulesをインストールしてください
```
cd front && yarn
```
4. 下記のコマンドを実行して、Next.js アプリケーションを実行してください
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

## APIのディレクトリ構成
```
.
├── controller
│   └── handler
│       ├── request     // APIのリクエストに使われるデータを構造体で定義してます。(バリデーションがかかるようにタグを書いています)
│       └── response    // APIのレスポンスに使われるデータを構造体で定義してます。
├── db
│   ├── init            // MySQLデータベースの初期化スクリプトが書かれているファイルがあります。
│   └── migrations      // マイグレーションファイルです。使いやすいように、マイグレーション時にデータを入れるようにしてます。
├── domain
│   ├── model           // ドメインモデル図に当たるものです。
│   └── repository      // リポジトリのインターフェースを定義してます。
├── infra
│   └── persistence     // DB操作など永続性に関わる処理を行なっています。repositoryの実装です。
├── injector            // handler usecase domain infraのDIです。
├── middleware          // リクエストログなどの、ミドルウェアです。
├── router              // APIのルーティングをしています。
├── shared              // sharedとして使いたいものが入ってます。
├── uploads             // アップロードされたファイルを格納するようにしています。
│   └── icon            // アイコン用のファイルを格納しています。
└── usecase             // repositoryで定義されているインターフェースを利用して、ユースケースを満たすようにしています。
```

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
