package repository

import (
	"log"

	"github.com/htoyoda18/TweetAppV2/api/model"
	"gorm.io/gorm"
)

type Tweet interface {
	Add(tweet *model.Tweet, db *gorm.DB) error
	List(db *gorm.DB) (tweet []*model.Tweet, err error)
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

func (t tweet) List(db *gorm.DB) ([]*model.Tweet, error) {
	tweet := []*model.Tweet{}
	if err := db.
		Model(&model.Tweet{}).
		Joins("LEFT JOIN replies ON tweets.id = replies.tweet_id").
		Find(&tweet).Error; err != nil {
		log.Println(err)
		return nil, err
	}

	return tweet, nil
}
