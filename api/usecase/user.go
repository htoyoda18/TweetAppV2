package usecase

import (
	"errors"
	"log"

	"github.com/htoyoda18/TweetAppV2/api/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/model"
	"github.com/htoyoda18/TweetAppV2/api/repository"
	"gorm.io/gorm"
)

type User interface {
	SignUp(params request.Signup) (*model.User, error)
}

type user struct {
	userRepository repository.User
	db             *gorm.DB
}

func NewUser(
	userRepository repository.User,
	db *gorm.DB,
) User {
	return user{
		userRepository: userRepository,
		db:             db,
	}
}

func (u user) SignUp(params request.Signup) (*model.User, error) {
	selectUser, _ := u.userRepository.Get(&model.User{Email: params.Email}, u.db)
	if selectUser != nil {
		err := errors.New("user Email Duplicate")
		return nil, err
	}

	user, err := u.userRepository.Add(&model.User{
		Name:     params.Username,
		Email:    params.Email,
		Password: params.Password,
	}, u.db)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	return user, nil
}
