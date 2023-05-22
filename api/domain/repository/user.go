package repository

import (
	"github.com/htoyoda18/TweetAppV2/api/domain/model"
	"gorm.io/gorm"
)

type User interface {
	Get(*model.User, *gorm.DB) (*model.User, error)
	Add(*model.User, *gorm.DB) (*model.User, error)
	UpdatePassword(*model.User, *gorm.DB) error
	UpdateUser(*model.User, *gorm.DB) error
}
