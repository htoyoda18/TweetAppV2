package handler

import (
	"log"
	"net/http"

	"github.com/htoyoda18/TweetAppV2/api/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/usecase"

	"github.com/gin-gonic/gin"
)

type User interface {
	SignUp(*gin.Context)
}

type user struct {
	userUsecase usecase.User
}

func NewUser(
	userUsecase usecase.User,
) User {
	return user{
		userUsecase: userUsecase,
	}
}

func (u user) SignUp(c *gin.Context) {
	var params request.Signup

	if err := c.ShouldBindJSON(&params); err != nil {
		log.Panicln(err)
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	user, err := u.userUsecase.SignUp(params)
	if err != nil {
		log.Panicln(err)
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	c.JSON(http.StatusOK, user)
}
