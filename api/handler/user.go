package handler

import (
	"log"
	"net/http"

	"github.com/htoyoda18/TweetAppV2/api/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/shaerd"
	"github.com/htoyoda18/TweetAppV2/api/usecase"

	"github.com/gin-gonic/gin"
)

type User interface {
	SignUp(*gin.Context)
	Login(*gin.Context)
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
		log.Println(err)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	user, err := u.userUsecase.SignUp(params)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, user)
}

func (u user) Login(c *gin.Context) {
	var params request.Login

	if err := c.ShouldBindJSON(&params); err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	user, err := u.userUsecase.Show(params)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	jwt := shaerd.NewJwt(user)

	c.SetCookie("jwt", jwt, 3000, "/", "localhost", true, true)
	c.Status(200)
}
