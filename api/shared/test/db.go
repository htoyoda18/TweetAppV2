package test

import (
	"fmt"
	"log"

	"github.com/htoyoda18/TweetAppV2/api/shared"
)

func GetDatabaseConnectionTest() (string, error) {
	env, err := shared.NewEnv()
	if err != nil {
		log.Println("InitDB: NewConfig ", err)
		return "", err
	}
	dbConnection := fmt.Sprintf("%s:%s@tcp(localhost:3307)/%s?parseTime=true", env.MysqlUser, env.MysqlPassword, env.MysqlDatabase)

	return dbConnection, nil
}
