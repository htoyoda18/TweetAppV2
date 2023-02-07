package injector

import (
	"github.com/htoyoda18/TweetAppV2/api/usecase"
	useCase "github.com/htoyoda18/TweetAppV2/api/usecase"
	"gorm.io/gorm"
)

type UseCase struct {
	User  useCase.User
	Tweet useCase.Tweet
	Reply usecase.Reply
}

func NewUseCase(db *gorm.DB) *UseCase {
	repository := NewRepository()

	userUseCase := useCase.NewUser(repository.User, db)
	tweetUseCase := useCase.NewTweet(repository.Tweet, db)
	replyUseCase := usecase.NewReply(repository.Reply, db)
	return &UseCase{
		User:  userUseCase,
		Tweet: tweetUseCase,
		Reply: replyUseCase,
	}
}