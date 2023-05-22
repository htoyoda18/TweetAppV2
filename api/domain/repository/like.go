package repository

import (
	"github.com/htoyoda18/TweetAppV2/api/domain/model"
	"gorm.io/gorm"
)

type Like interface {
	Get(*model.Like, *gorm.DB) (*model.Like, error)
	Add(*model.Like, *gorm.DB) error
	Delete(*model.Like, *gorm.DB) error
}
