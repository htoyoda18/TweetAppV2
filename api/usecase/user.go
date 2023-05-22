package usecase

import (
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/htoyoda18/TweetAppV2/api/controller/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/model"
	"github.com/htoyoda18/TweetAppV2/api/repository"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"gorm.io/gorm"
)

type User interface {
	Create(params request.Signup) (*model.User, error)
	Show(params request.Login) (*model.User, error)
	PasswordReset(mail string) error
	UpdatePassword(password string, userID int) error
	UpdateUser(userID int, icon string, userName string, introduction string) error
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

func (u user) Create(params request.Signup) (*model.User, error) {
	shared.Debug(LogVal("User", "Create"))

	selectUser, _ := u.userRepository.Get(&model.User{Email: params.Email}, u.db)
	if selectUser != nil {
		err := shared.UserEmailDuplicate
		shared.Warn(LogVal("User", "Create", err))
		return nil, err
	}

	password, _ := shared.PasswordEncrypt(params.Password)
	log.Println(password)

	user, err := u.userRepository.Add(&model.User{
		Name:     params.Username,
		Email:    params.Email,
		Password: password,
	}, u.db)
	if err != nil {
		shared.Warn(LogVal("User", "Create", err))
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
	shared.Debug(LogVal("User", "Show"))

	user, err := u.userRepository.Get(&model.User{
		Email: params.Email,
	}, u.db)
	if err != nil {
		shared.Warn(LogVal("User", "Show", err))
		err := shared.UserNotFound
		return nil, err
	}
	err = shared.CompareHashAndPassword(user.Password, params.Password)
	if err != nil {
		shared.Warn(LogVal("User", "Show", err))
		err := shared.UserNotFound
		return nil, err
	}

	return user, nil
}

func (u user) PasswordReset(mail string) error {
	shared.Debug(LogVal("User", "PasswordReset"))

	user, err := u.userRepository.Get(&model.User{
		Email: mail,
	}, u.db)
	if err != nil {
		shared.Warn(LogVal("User", "PasswordReset", err))
		err := shared.EmailNotFound
		return err
	}

	expiration := time.Now().Add(time.Minute * 15).Unix()
	jwt := shared.NewJwt(user, expiration)
	url := fmt.Sprintf("http://localhost:3000/password_update/%s", jwt)

	err = SendMail(SendMailParam{
		From:     user.Email,
		Username: user.Name,
		Body:     user.Name + "様 こちらのURL" + url + "よりパスワードのリセットをしてください",
		Subject:  "パスワードのリセット",
	})
	if err != nil {
		shared.Warn(LogVal("User", "PasswordReset", err))
		return err
	}

	return nil
}

func (u user) UpdatePassword(password string, userID int) error {
	shared.Debug(LogVal("User", "UpdatePassword"))

	hashPassword, _ := shared.PasswordEncrypt(password)

	err := u.userRepository.UpdatePassword(&model.User{
		ID:       userID,
		Password: hashPassword,
	}, u.db)
	if errors.Is(err, gorm.ErrRecordNotFound) {
		err := shared.EmailNotFound
		shared.Warn(LogVal("User", "UpdatePassword", err))
		return err
	} else if err != nil {
		shared.Error(LogVal("User", "UpdatePassword", err))
		return err
	}

	return nil
}

func (u user) UpdateUser(userID int, icon string, userName string, introduction string) error {
	shared.Debug(LogVal("User", "UpdateUser"))

	err := u.userRepository.UpdateUser(&model.User{
		ID:           userID,
		Icon:         icon,
		Name:         userName,
		Introduction: introduction,
	}, u.db)
	if err != nil {
		shared.Warn(LogVal("User", "UpdateUser", err))
		return err
	}

	return nil
}

func (u user) Get(userID int) (*model.User, error) {
	shared.Debug(LogVal("User", "Get"))

	user, err := u.userRepository.Get(&model.User{
		ID: userID,
	}, u.db)
	if err != nil {
		shared.Warn(LogVal("User", "Get", err))
		return user, err
	}

	return user, nil
}
