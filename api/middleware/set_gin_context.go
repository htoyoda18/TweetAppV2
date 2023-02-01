package middleware

import (
	"github.com/htoyoda18/TweetAppV2/api/db"
	"gorm.io/gorm"
)

func ConnectDB() *gorm.DB {
	db, err := db.InitDB()
	if err != nil {
		panic(err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		panic(err)
	}

	defer sqlDB.Close()

	return db
}
