package repository

import (
	"github.com/htoyoda18/TweetAppV2/api/domain/model"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"gorm.io/gorm"
)

type Reply interface {
	Add(*model.Reply, *gorm.DB) error
}

type reply struct{}

func NewReply() Reply {
	return reply{}
}

func (r reply) Add(reply *model.Reply, db *gorm.DB) error {
	shared.Debug(LogVal("Reply", "Add"))

	if err := db.Create(reply).Error; err != nil {
		shared.Warn(LogVal("Reply", "Add", err))
		return err
	}
	return nil
}
