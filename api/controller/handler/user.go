package handler

import (
	"net/http"
	"strconv"

	"github.com/htoyoda18/TweetAppV2/api/controller/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/controller/handler/response"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"github.com/htoyoda18/TweetAppV2/api/usecase"

	"github.com/gin-gonic/gin"
)

type User interface {
	Create(*gin.Context)
	Login(*gin.Context)
	PasswordReset(*gin.Context)
	UpdatePassword(*gin.Context)
	UpdateUser(*gin.Context)
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
	shared.Debug(LogVal("User", "Create"))

	var params request.Signup

	if err := c.ShouldBindJSON(&params); err != nil {
		shared.Warn(LogVal("User", "Create", err))
		err = shared.ShouldBindJsonErr
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	user, err := u.userUsecase.Create(params)
	if err != nil {
		shared.Warn(LogVal("User", "Create", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, user)
}

func (u user) Login(c *gin.Context) {
	shared.Debug(LogVal("User", "Login"))

	var params request.Login

	if err := c.ShouldBindJSON(&params); err != nil {
		shared.Warn(LogVal("User", "Login", err))
		err = shared.ShouldBindJsonErr
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	user, err := u.userUsecase.Authenticate(params)
	if err != nil {
		shared.Warn(LogVal("User", "Login", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	jwt := shared.NewJwt(user, shared.TokenExpiration)
	loginResponse := response.LoginResponse{
		Token:  jwt,
		UserID: user.ID,
	}

	c.JSON(http.StatusOK, loginResponse)
}

func (u user) PasswordReset(c *gin.Context) {
	shared.Debug(LogVal("User", "PasswordReset"))

	var params request.PasswordReset

	if err := c.ShouldBindJSON(&params); err != nil {
		shared.Warn(LogVal("User", "PasswordReset", err))
		err = shared.ShouldBindJsonErr
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	err := u.userUsecase.PasswordReset(params.Email)
	if err != nil {
		shared.Warn(LogVal("User", "PasswordReset", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.Status(http.StatusOK)
}

func (u user) UpdatePassword(c *gin.Context) {
	shared.Debug(LogVal("User", "UpdatePassword"))

	var params request.UpdatePassword

	if err := c.ShouldBindJSON(&params); err != nil {
		shared.Warn(LogVal("User", "UpdatePassword", err))
		err = shared.ShouldBindJsonErr
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	token := c.Param("token")
	userID, err := shared.JwtParse(token)
	if err != nil {
		err := shared.FailAuthToken
		shared.Warn(LogVal("User", "UpdatePassword", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	err = u.userUsecase.UpdatePassword(params.Password, userID)
	if err != nil {
		shared.Warn(LogVal("User", "UpdatePassword", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.Status(http.StatusOK)
}

func (u user) UpdateUser(c *gin.Context) {
	shared.Debug(LogVal("User", "UpdateUser"))

	var params request.UpdateUser

	if err := c.ShouldBindJSON(&params); err != nil {
		shared.Warn(LogVal("User", "UpdatePassword", err))
		err = shared.ShouldBindJsonErr
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	userID, err := shared.AuthUser(c)
	if err != nil {
		shared.Warn(LogVal("User", "UpdatePassword", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	err = u.userUsecase.UpdateUser(userID, params.Icon, params.Username, params.Introduction)
	if err != nil {
		shared.Warn(LogVal("User", "UpdatePassword", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.Status(http.StatusOK)
}

func (u user) Get(c *gin.Context) {
	shared.Debug(LogVal("User", "Get"))

	_, err := shared.AuthUser(c)
	if err != nil {
		shared.Warn(LogVal("Get", "UpdatePassword", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	userID, _ := strconv.Atoi(c.Param("id"))

	user, err := u.userUsecase.Get(userID)
	if err != nil {
		shared.Warn(LogVal("Get", "UpdatePassword", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, user)
}
