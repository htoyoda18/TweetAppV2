package injector

import (
	"github.com/htoyoda18/TweetAppV2/api/handler"
	"gorm.io/gorm"
)

type Handler struct {
	User  handler.User
	Ping  handler.Ping
	Tweet handler.Tweet
}

func NewHandler(db *gorm.DB) *Handler {
	usecase := NewUseCase(db)

	userHandler := handler.NewUser(usecase.User)
	pingHandler := handler.NewPing()
	tweetHandler := handler.NewTweet(usecase.Tweet)
	return &Handler{
		User:  userHandler,
		Ping:  pingHandler,
		Tweet: tweetHandler,
	}
}
