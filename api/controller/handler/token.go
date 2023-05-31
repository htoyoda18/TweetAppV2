package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/shared"
)

type Token interface {
	ValidateToken(*gin.Context)
}

type token struct{}

func NewToken() Token {
	return token{}
}

func (t token) ValidateToken(ctx *gin.Context) {
	shared.Debug(LogVal("Token", "ValidateToken"))

	_, err := shared.AuthUser(ctx)
	if err != nil {
		shared.Warn(LogVal("Token", "ValidateToken", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	ctx.Status(200)
}
