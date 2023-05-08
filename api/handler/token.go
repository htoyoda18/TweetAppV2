package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/shaerd"
)

type Token interface {
	ValidateToken(*gin.Context)
}

type token struct{}

func NewToken() Token {
	return token{}
}

func (t token) ValidateToken(c *gin.Context) {
	_, err := shaerd.AuthUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.Status(200)
}
