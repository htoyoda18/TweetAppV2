package test

import "github.com/joho/godotenv"

// 環境変数を読み込む
func ReadEnvFile() error {
	if err := godotenv.Load("../../.env.test"); err != nil {
		return err
	}
	return nil
}
