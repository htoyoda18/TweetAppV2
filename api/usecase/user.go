package usecase

import (
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/htoyoda18/TweetAppV2/api/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/model"
	"github.com/htoyoda18/TweetAppV2/api/repository"
	"github.com/htoyoda18/TweetAppV2/api/shaerd"
	"gorm.io/gorm"
)

type User interface {
	SignUp(params request.Signup) (*model.User, error)
	Show(params request.Login) (*model.User, error)
	PasswordReset(mail string) error
	PasswordUpdate(password string, userID int) error
	Get(userID int) (*model.User, error)
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

	password, _ := shaerd.PasswordEncrypt(params.Password)
	log.Println(password)

	user, err := u.userRepository.Add(&model.User{
		Name:     params.Username,
		Email:    params.Email,
		Password: password,
	}, u.db)
	if err != nil {
		shaerd.Error(LogVal("SignUp", err))
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
		Email: params.Email,
	}, u.db)
	if err != nil {
		shaerd.Error(LogVal("Show", err))
		err := errors.New(shaerd.UserNotFound)
		return nil, err
	}
	err = shaerd.CompareHashAndPassword(user.Password, params.Password)
	if err != nil {
		shaerd.Error(LogVal("Show", err))
		err := errors.New(shaerd.UserNotFound)
		return nil, err
	}

	return user, nil
}

func (u user) PasswordReset(mail string) error {
	user, err := u.userRepository.Get(&model.User{
		Email: mail,
	}, u.db)
	if err != nil {
		shaerd.Error(LogVal("PasswordReset", err))
		err := errors.New(shaerd.EmailNotFound)
		return err
	}

	expiration := time.Now().Add(time.Minute * 15).Unix()
	jwt := shaerd.NewJwt(user, expiration)
	url := fmt.Sprintf("http://localhost:3000/password_update/%s", jwt)

	err = SendMail(SendMailParam{
		From:     user.Email,
		Username: user.Name,
		Body:     user.Name + "様 こちらのURL" + url + "よりパスワードのリセットをしてください",
		Subject:  "パスワードのリセット",
	})
	if err != nil {
		return err
	}

	return nil
}

func (u user) PasswordUpdate(password string, userID int) error {
	hashPassword, _ := shaerd.PasswordEncrypt(password)

	err := u.userRepository.UpdatePassword(&model.User{
		ID:       userID,
		Password: hashPassword,
	}, u.db)
	if err != nil {
		shaerd.Error(LogVal("PasswordUpdate", err))
		err := errors.New(shaerd.EmailNotFound)
		return err
	}

	return nil
}

func (u user) Get(userID int) (*model.User, error) {
	user, err := u.userRepository.Get(&model.User{
		ID: userID,
	}, u.db)
	if err != nil {
		shaerd.Error(LogVal("Get", err))
		return user, err
	}

	return user, nil
}
