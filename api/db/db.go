package db

import (
	"fmt"
	"log"
	"time"

	"github.com/htoyoda18/TweetAppV2/api/shared"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func InitDB() (*gorm.DB, error) {
	env, err := shared.NewEnv()
	if err != nil {
		log.Println("InitDB: NewConfig ", err)
		return nil, err
	}
	dbConnection := fmt.Sprintf("%s:%s@tcp(%s:3306)/%s?parseTime=true", env.MysqlUser, env.MysqlPassword, env.MysqlHost, env.MysqlDatabase)

	db, err := gorm.Open(mysql.Open(dbConnection), &gorm.Config{})
	if err != nil {
		log.Println("InitDB: gorm.Open ", err)
	}
	sqlDB, err := db.DB()
	if err != nil {
		log.Println("InitDB: db.DB()", err)
	}
	for {
		err = sqlDB.Ping()
		if err == nil {
			break
		}
		time.Sleep(3 * time.Second)
	}
	return db, nil
}
