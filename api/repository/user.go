package repository

import (
	"errors"

	"github.com/htoyoda18/TweetAppV2/api/model"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"gorm.io/gorm"
)

type User interface {
	Get(*model.User, *gorm.DB) (*model.User, error)
	Add(*model.User, *gorm.DB) (*model.User, error)
	UpdatePassword(*model.User, *gorm.DB) error
	UpdateUser(*model.User, *gorm.DB) error
}

type user struct{}

func NewUser() User {
	return user{}
}

func (u user) Get(where *model.User, db *gorm.DB) (*model.User, error) {
	shared.Debug(LogVal("User", "Get"))

	user := &model.User{}
	if err := db.Debug().Where(where).First(user).Error; errors.Is(err, gorm.ErrRecordNotFound) {
		shared.Warn(LogVal("User", "Get", err))
		return nil, err
	} else if err != nil {
		shared.Error(LogVal("User", "Get", err))
		return nil, err
	}

	return user, nil
}

func (u user) Add(user *model.User, db *gorm.DB) (*model.User, error) {
	shared.Debug(LogVal("User", "Add"))

	if err := db.Create(user).Error; err != nil {
		shared.Warn(LogVal("User", "Add", err))
		return nil, err
	}
	return user, nil
}

func (u user) UpdatePassword(user *model.User, db *gorm.DB) error {
	shared.Debug(LogVal("User", "UpdatePassword"))

	if err := db.Model(&model.User{}).Where("id = ?", user.ID).Update("password", user.Password).Error; err != nil {
		shared.Warn(LogVal("User", "UpdatePassword", err))
		return err
	}

	return nil
}

func (u user) UpdateUser(user *model.User, db *gorm.DB) error {
	shared.Debug(LogVal("User", "UpdateUser"))

	updates := map[string]interface{}{
		"name":         user.Name,
		"introduction": user.Introduction,
		"icon":         user.Icon,
	}

	if err := db.Model(&model.User{}).Where("id = ?", user.ID).Updates(updates).Error; err != nil {
		shared.Warn(LogVal("User", "UpdatePassword", err))
		return err
	}

	return nil
}
