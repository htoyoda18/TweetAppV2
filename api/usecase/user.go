package usecase

import (
	"errors"
	"log"

	"github.com/htoyoda18/TweetAppV2/api/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/model"
	"github.com/htoyoda18/TweetAppV2/api/repository"
	"github.com/htoyoda18/TweetAppV2/api/shaerd"
	"gorm.io/gorm"
)

type User interface {
	SignUp(params request.Signup) (*model.User, error)
	Show(params request.Login) (*model.User, error)
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
		err := errors.New(shaerd.UserEmailDuplicate)
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

	log.Println("user.Email", user.Email)
	err = SendMail(SendMailParam{
		From:     user.Email,
		Username: user.Name,
		Body:     user.Name + "様 ご登録いただきありがとうございます",
		Subject:  "ご登録ありがとうございます",
	})
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (u user) Show(params request.Login) (*model.User, error) {
	user, err := u.userRepository.Get(&model.User{
		Email:    params.Email,
		Password: params.Password,
	}, u.db)
	if err != nil {
		log.Println(err)
		err := errors.New(shaerd.UserNotFound)
		return nil, err
	}

	return user, nil
}
