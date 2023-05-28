package test

import (
	"github.com/htoyoda18/TweetAppV2/api/domain/model"
	"github.com/htoyoda18/TweetAppV2/api/shared"
)

func GenerateTestToken() string {
	testUser := model.User{
		ID:    4,
		Name:  "コマさん",
		Email: "4@example.com",
	}

	token := shared.NewJwt(&testUser, shared.TestTokenExpiration)

	return token
}
