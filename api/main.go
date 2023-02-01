package main

import (
	"github.com/htoyoda18/TweetAppV2/api/middleware"
	"github.com/htoyoda18/TweetAppV2/api/router"
)

func main() {
	db, sqlDB := middleware.ConnectDB()
	defer sqlDB.Close()
	r := router.SetupRouter(db)
	r.Run(":8080")
}
