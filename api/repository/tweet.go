package repository

import (
	"errors"

	"github.com/htoyoda18/TweetAppV2/api/domain/model"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"gorm.io/gorm"
)

type Tweet interface {
	Add(tweet *model.Tweet, db *gorm.DB) error
	List(where *model.Tweet, db *gorm.DB) (tweet []*model.Tweet, err error)
	Get(tweetID int, db *gorm.DB) (tweet *model.Tweet, err error)
}

type tweet struct{}

func NewTweet() Tweet {
	return tweet{}
}

func preload() func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.
			Preload("User").
			Preload("Replies").
			Preload("Replies.User").
			Preload("Likes")
	}
}

func (t tweet) Add(tweet *model.Tweet, db *gorm.DB) error {
	shared.Debug(LogVal("Tweet", "Add"))

	if err := db.Create(tweet).Error; err != nil {
		shared.Warn(LogVal("Tweet", "Add", err))
		return err
	}
	return nil
}

func (t tweet) List(where *model.Tweet, db *gorm.DB) ([]*model.Tweet, error) {
	shared.Debug(LogVal("Tweet", "List"))

	tweet := []*model.Tweet{}
	if where != nil {
		db = db.Where(where)
	}
	if err := db.
		Scopes(preload()).
		Order("created_at DESC").
		Find(&tweet).Error; err != nil {
		shared.Error(LogVal("Tweet", "List", err))
		return nil, err
	}

	return tweet, nil
}

func (t tweet) Get(tweetID int, db *gorm.DB) (*model.Tweet, error) {
	shared.Debug(LogVal("Tweet", "Get"))

	tweet := &model.Tweet{}
	if err := db.
		Scopes(preload()).
		Where("id = ?", tweetID).
		Order("created_at DESC").
		First(&tweet).Error; errors.Is(err, gorm.ErrRecordNotFound) {
		shared.Warn(LogVal("Tweet", "Get", err))
		return nil, err
	} else if err != nil {
		shared.Error(LogVal("Tweet", "Get", err))
	}

	return tweet, nil
}
