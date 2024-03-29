package injector

import (
	"github.com/htoyoda18/TweetAppV2/api/controller/handler"
	"gorm.io/gorm"
)

type Handler struct {
	User  handler.User
	Ping  handler.Ping
	File  handler.File
	Tweet handler.Tweet
	Reply handler.Reply
	Token handler.Token
	Like  handler.Like
}

func NewHandler(db *gorm.DB) *Handler {
	usecase := NewUseCase(db)

	userHandler := handler.NewUser(usecase.User, usecase.File)
	pingHandler := handler.NewPing()
	tweetHandler := handler.NewTweet(usecase.Tweet, usecase.User)
	replyHandler := handler.NewReply(usecase.Reply)
	tokenHandler := handler.NewToken()
	uploadHandler := handler.NewFile(usecase.File)
	likeHandler := handler.NewLike(usecase.Like)
	return &Handler{
		User:  userHandler,
		Ping:  pingHandler,
		Tweet: tweetHandler,
		Reply: replyHandler,
		Token: tokenHandler,
		File:  uploadHandler,
		Like:  likeHandler,
	}
}
