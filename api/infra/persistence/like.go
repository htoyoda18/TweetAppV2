package persistence

import (
	"errors"

	"github.com/htoyoda18/TweetAppV2/api/domain/model"
	"github.com/htoyoda18/TweetAppV2/api/domain/repository"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"gorm.io/gorm"
)

type like struct{}

func NewLike() repository.Like {
	return like{}
}

func (l like) Get(where *model.Like, db *gorm.DB) (*model.Like, error) {
	shared.Debug(LogVal("Like", "Get"))

	like := &model.Like{}
	if err := db.Debug().Where(where).First(like).Error; errors.Is(err, gorm.ErrRecordNotFound) {
		shared.Warn(LogVal("Like", "Get", err))
		return nil, err
	} else if err != nil {
		shared.Error(LogVal("Like", "Get", err))
		return nil, err
	}

	return like, nil
}

func (l like) Add(like *model.Like, db *gorm.DB) error {
	shared.Debug(LogVal("Like", "Add"))

	if err := db.Debug().Create(like).Error; err != nil {
		shared.Warn(LogVal("Like", "Add", err))
		return err
	}

	return nil
}

func (l like) Delete(like *model.Like, db *gorm.DB) error {
	shared.Debug(LogVal("Like", "Delete"))

	if err := db.Debug().Unscoped().Delete(like).Error; errors.Is(err, gorm.ErrRecordNotFound) {
		shared.Warn(LogVal("Like", "Delete", err))
		return err
	} else if err != nil {
		shared.Error(LogVal("Like", "Delete", err))
		return err
	}

	return nil
}
