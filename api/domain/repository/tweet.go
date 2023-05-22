package repository

import (
	"github.com/htoyoda18/TweetAppV2/api/domain/model"
	"gorm.io/gorm"
)

type Tweet interface {
	Add(tweet *model.Tweet, db *gorm.DB) error
	List(where *model.Tweet, db *gorm.DB) (tweet []*model.Tweet, err error)
	Get(tweetID int, db *gorm.DB) (tweet *model.Tweet, err error)
}
