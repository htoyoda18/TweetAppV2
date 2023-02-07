package usecase

import (
	"log"

	"github.com/htoyoda18/TweetAppV2/api/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/model"
	"github.com/htoyoda18/TweetAppV2/api/repository"
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
	err := r.replyRepository.Add(&model.Reply{
		UserID:  userIO,
		Reply:   replyParams.Reply,
		TweetID: replyParams.TweetID,
	}, r.db)

	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}
