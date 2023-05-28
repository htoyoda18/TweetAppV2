package main

import (
	"log"

	"github.com/htoyoda18/TweetAppV2/api/middleware"
	"github.com/htoyoda18/TweetAppV2/api/router"
	"github.com/htoyoda18/TweetAppV2/api/shared"
)

func main() {
	env, err := shared.NewEnv()
	if err != nil {
		log.Println("InitDB: NewConfig ", err)
	}
	db, sqlDB := middleware.ConnectDB()
	defer sqlDB.Close()
	r := router.SetupRouter(db)
	r.Run(":" + env.APIPort)
}
