package handler

import (
	"errors"
	"log"
	"net/http"
	"time"

	"github.com/htoyoda18/TweetAppV2/api/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/shaerd"
	"github.com/htoyoda18/TweetAppV2/api/usecase"

	"github.com/gin-gonic/gin"
)

type User interface {
	SignUp(*gin.Context)
	Login(*gin.Context)
	PasswordReset(*gin.Context)
	PasswordUpdate(*gin.Context)
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
		err = errors.New(shaerd.ShouldBindJSONErr)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	user, err := u.userUsecase.Show(params)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	expiration := time.Now().Add(time.Hour * 24).Unix()
	jwt := shaerd.NewJwt(user, expiration)

	c.SetCookie("jwt", jwt, 3000, "/", "localhost", true, true)
	c.JSON(http.StatusOK, user)
}

func (u user) PasswordReset(c *gin.Context) {
	var params request.PasswordReset

	if err := c.ShouldBindJSON(&params); err != nil {
		log.Println(err)
		err = errors.New(shaerd.ShouldBindJSONErr)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	err := u.userUsecase.PasswordReset(params.Email)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.Status(http.StatusOK)
}

func (u user) PasswordUpdate(c *gin.Context) {
	var params request.PasswordUpdate

	if err := c.ShouldBindJSON(&params); err != nil {
		log.Println(err)
		err = errors.New(shaerd.ShouldBindJSONErr)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	token := c.Param("token")
	userID, err := shaerd.JwtParse(token)
	if err != nil {
		err = errors.New(shaerd.FailAuthToken)
		c.JSON(http.StatusBadRequest, err.Error())
	}

	err = u.userUsecase.PasswordUpdate(params.Password, userID)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.Status(http.StatusOK)
}
