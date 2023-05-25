package test

import (
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"github.com/pressly/goose"
	"gorm.io/gorm"
)

func TearDown(db *gorm.DB) {
	sqlDB, err := db.DB()
	if err != nil {
		shared.Error("TearDown: db.DB()", err)
	}

	goose.SetDialect("mysql")
	if err := goose.DownTo(sqlDB, "../../db/migrations", 0); err != nil {
		shared.Error("goose down failed: %v", err)
	}

	if err := goose.Up(sqlDB, "../../db/migrations"); err != nil {
		shared.Error("goose up failed: %v", err)
	}
}
