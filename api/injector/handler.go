package injector

import (
	"github.com/htoyoda18/TweetAppV2/api/handler"
	"gorm.io/gorm"
)

type Handler struct {
	User  handler.User
	Ping  handler.Ping
	File  handler.File
	Tweet handler.Tweet
	Reply handler.Reply
	Token handler.Token
}

func NewHandler(db *gorm.DB) *Handler {
	usecase := NewUseCase(db)

	userHandler := handler.NewUser(usecase.User)
	pingHandler := handler.NewPing()
	tweetHandler := handler.NewTweet(usecase.Tweet)
	replyHandler := handler.NewReply(usecase.Reply)
	tokenHandler := handler.NewToken()
	uploadHandler := handler.NewFile()
	return &Handler{
		User:  userHandler,
		Ping:  pingHandler,
		Tweet: tweetHandler,
		Reply: replyHandler,
		Token: tokenHandler,
		File:  uploadHandler,
	}
}
