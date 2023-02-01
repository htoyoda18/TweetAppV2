package injector

import (
	useCase "github.com/htoyoda18/TweetAppV2/api/usecase"
	"gorm.io/gorm"
)

type UseCase struct {
	User useCase.User
}

func NewUseCase(db *gorm.DB) *UseCase {
	repository := NewRepository()

	userUseCase := useCase.NewUser(repository.User, db)
	return &UseCase{
		User: userUseCase,
	}
}
