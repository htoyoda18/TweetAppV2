package repository

import (
	"github.com/htoyoda18/TweetAppV2/api/model"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"gorm.io/gorm"
)

type Like interface {
	Get(*model.Like, *gorm.DB) (*model.Like, error)
	Add(*model.Like, *gorm.DB) error
	Delete(*model.Like, *gorm.DB) error
}

type like struct{}

func NewLike() Like {
	return like{}
}

func (l like) Get(where *model.Like, db *gorm.DB) (*model.Like, error) {
	shared.Debug(LogVal("Like", "Get"))

	like := &model.Like{}
	if err := db.Debug().Where(where).First(like).Error; err != nil {
		shared.Error(LogVal("Like", "Get", err))
		return nil, err
	}

	return like, nil
}

func (l like) Add(like *model.Like, db *gorm.DB) error {
	shared.Debug(LogVal("Like", "Add"))

	if err := db.Debug().Create(like).Error; err != nil {
		shared.Error(LogVal("Like", "Add", err))
		return err
	}

	return nil
}

func (l like) Delete(like *model.Like, db *gorm.DB) error {
	shared.Debug(LogVal("Like", "Delete"))

	if err := db.Debug().Unscoped().Delete(like).Error; err != nil {
		shared.Error(LogVal("Like", "Delete", err))
		return err
	}

	return nil
}
