package repository

import (
	"log"

	"github.com/htoyoda18/TweetAppV2/api/model"
	"gorm.io/gorm"
)

type User interface {
	Get(*model.User, *gorm.DB) (*model.User, error)
	Add(*model.User, *gorm.DB) (*model.User, error)
	UpdatePassword(*model.User, *gorm.DB) error
}

type user struct{}

func NewUser() User {
	return user{}
}

func (u user) Get(where *model.User, db *gorm.DB) (*model.User, error) {
	user := &model.User{}
	if err := db.Debug().Where(where).First(user).Error; err != nil {
		log.Println(err)
		return nil, err
	}

	return user, nil
}

func (u user) Add(user *model.User, db *gorm.DB) (*model.User, error) {
	if err := db.Create(user).Error; err != nil {
		log.Println(err)
		return nil, err
	}
	return user, nil
}

func (u user) UpdatePassword(user *model.User, db *gorm.DB) error {

	if err := db.Model(&model.User{}).Where("id = ?", user.ID).Update("password", user.Password).Error; err != nil {
		log.Println(err)
		return err
	}

	return nil
}