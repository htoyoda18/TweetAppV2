package db

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func InitDB() (*gorm.DB, error) {
	err := godotenv.Load("./db/.env")
	dbConnection := fmt.Sprintf("%s:%s@tcp(db:3306)/%s?parseTime=true", os.Getenv("MYSQL_USER"), os.Getenv("MYSQL_PASSWORD"), os.Getenv("MYSQL_DATABASE"))
	fmt.Println("dbConnection", dbConnection)
	log.Println("dbConnection", dbConnection)

	db, err := gorm.Open(mysql.Open(dbConnection), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	return db, nil
}
