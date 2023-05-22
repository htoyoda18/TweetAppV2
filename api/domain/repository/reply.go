package repository

import (
	"github.com/htoyoda18/TweetAppV2/api/domain/model"
	"gorm.io/gorm"
)

type Reply interface {
	Add(*model.Reply, *gorm.DB) error
}
