package middleware

import (
	"database/sql"

	"github.com/htoyoda18/TweetAppV2/api/db"
	"gorm.io/gorm"
)

func ConnectDB() (*gorm.DB, *sql.DB) {
	db, err := db.InitDB()
	if err != nil {
		panic(err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		panic(err)
	}

	return db, sqlDB
}
