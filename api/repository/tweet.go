package repository

import (
	"log"

	"github.com/htoyoda18/TweetAppV2/api/model"
	"gorm.io/gorm"
)

type Tweet interface {
	Add(tweet *model.Tweet, db *gorm.DB) error
}

type tweet struct{}

func NewTweet() Tweet {
	return tweet{}
}

func (t tweet) Add(tweet *model.Tweet, db *gorm.DB) error {
	if err := db.Create(tweet).Error; err != nil {
		log.Println(err)
		return err
	}
	return nil
}
