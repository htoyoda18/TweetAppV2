package handler

import (
	"errors"
	"net/http"
	"strconv"
	"time"

	"github.com/htoyoda18/TweetAppV2/api/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/handler/response"
	"github.com/htoyoda18/TweetAppV2/api/shaerd"
	"github.com/htoyoda18/TweetAppV2/api/usecase"

	"github.com/gin-gonic/gin"
)

type User interface {
	Create(*gin.Context)
	Login(*gin.Context)
	PasswordReset(*gin.Context)
	UpdatePassword(*gin.Context)
	Get(*gin.Context)
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

func (u user) Create(c *gin.Context) {
	shaerd.Info("Create")

	var params request.Signup

	if err := c.ShouldBindJSON(&params); err != nil {
		shaerd.Error(LogVal("Create", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	user, err := u.userUsecase.Create(params)
	if err != nil {
		shaerd.Error(LogVal("Create", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, user)
}

func (u user) Login(c *gin.Context) {
	shaerd.Info("Login")

	var params request.Login

	if err := c.ShouldBindJSON(&params); err != nil {
		err = errors.New(shaerd.ShouldBindJSONErr)
		shaerd.Error(LogVal("Login", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	user, err := u.userUsecase.Show(params)
	if err != nil {
		shaerd.Error(LogVal("Login", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	expiration := time.Now().Add(time.Hour * 24).Unix()
	jwt := shaerd.NewJwt(user, expiration)
	token := response.Token{
		Token: jwt,
	}

	c.JSON(http.StatusOK, token)
}

func (u user) PasswordReset(c *gin.Context) {
	shaerd.Info("PasswordReset")

	var params request.PasswordReset

	if err := c.ShouldBindJSON(&params); err != nil {
		shaerd.Error(LogVal("PasswordReset", err))
		err = errors.New(shaerd.ShouldBindJSONErr)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	err := u.userUsecase.PasswordReset(params.Email)
	if err != nil {
		shaerd.Error(LogVal("PasswordReset", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.Status(http.StatusOK)
}

func (u user) UpdatePassword(c *gin.Context) {
	shaerd.Info("UpdatePassword")

	var params request.UpdatePassword

	if err := c.ShouldBindJSON(&params); err != nil {
		shaerd.Error(LogVal("UpdatePassword", err))
		err = errors.New(shaerd.ShouldBindJSONErr)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	token := c.Param("token")
	userID, err := shaerd.JwtParse(token)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	err = u.userUsecase.UpdatePassword(params.Password, userID)
	if err != nil {
		shaerd.Error(LogVal("UpdatePassword", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.Status(http.StatusOK)
}

func (u user) Get(c *gin.Context) {
	shaerd.Info("Get")

	_, err := shaerd.AuthUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	userID, _ := strconv.Atoi(c.Param("id"))

	user, err := u.userUsecase.Get(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, user)
}
