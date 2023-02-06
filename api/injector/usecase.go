package injector

import (
	useCase "github.com/htoyoda18/TweetAppV2/api/usecase"
	"gorm.io/gorm"
)

type UseCase struct {
	User  useCase.User
	Tweet useCase.Tweet
}

func NewUseCase(db *gorm.DB) *UseCase {
	repository := NewRepository()

	userUseCase := useCase.NewUser(repository.User, db)
	tweetUseCase := useCase.NewTweet(repository.Tweet, db)
	return &UseCase{
		User:  userUseCase,
		Tweet: tweetUseCase,
	}
}
