package usecase

import (
	"github.com/htoyoda18/TweetAppV2/api/controller/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/domain/model"
	"github.com/htoyoda18/TweetAppV2/api/domain/repository"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"gorm.io/gorm"
)

type Reply interface {
	Add(userIO int, replyParams request.Reply) error
}

type reply struct {
	replyRepository repository.Reply
	db              *gorm.DB
}

func NewReply(
	replyRepository repository.Reply,
	db *gorm.DB,
) Reply {
	return reply{
		replyRepository: replyRepository,
		db:              db,
	}
}

func (r reply) Add(userIO int, replyParams request.Reply) error {
	shared.Debug(LogVal("Reply", "Add"))

	err := r.replyRepository.Add(&model.Reply{
		UserID:  userIO,
		Reply:   replyParams.Reply,
		TweetID: replyParams.TweetID,
	}, r.db)

	if err != nil {
		shared.Warn(LogVal("Reply", "Add", err))
		return err
	}

	return nil
}
