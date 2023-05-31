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
	fileUsecase usecase.File
}

func NewUser(
	userUsecase usecase.User,
	fileUsecase usecase.File,
) User {
	return user{
		userUsecase: userUsecase,
		fileUsecase: fileUsecase,
	}
}

func (u user) Create(ctx *gin.Context) {
	shared.Debug(LogVal("User", "Create"))

	var params request.Signup

	if err := ctx.ShouldBindJSON(&params); err != nil {
		shared.Warn(LogVal("User", "Create", err))
		err = shared.ShouldBindJsonErr
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	user, err := u.userUsecase.Create(params)
	if err != nil {
		shared.Warn(LogVal("User", "Create", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, user)
}

func (u user) Login(ctx *gin.Context) {
	shared.Debug(LogVal("User", "Login"))

	var params request.Login

	if err := ctx.ShouldBindJSON(&params); err != nil {
		shared.Warn(LogVal("User", "Login", err))
		err = shared.ShouldBindJsonErr
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	user, err := u.userUsecase.Authenticate(params)
	if err != nil {
		shared.Warn(LogVal("User", "Login", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	jwt := shared.NewJwt(user, shared.TokenExpiration)
	loginResponse := response.LoginResponse{
		Token:  jwt,
		UserID: user.ID,
	}

	ctx.JSON(http.StatusOK, loginResponse)
}

func (u user) PasswordReset(ctx *gin.Context) {
	shared.Debug(LogVal("User", "PasswordReset"))

	var params request.PasswordReset

	if err := ctx.ShouldBindJSON(&params); err != nil {
		shared.Warn(LogVal("User", "PasswordReset", err))
		err = shared.ShouldBindJsonErr
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	err := u.userUsecase.PasswordReset(params.Email)
	if err != nil {
		shared.Warn(LogVal("User", "PasswordReset", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	ctx.Status(http.StatusOK)
}

func (u user) UpdatePassword(ctx *gin.Context) {
	shared.Debug(LogVal("User", "UpdatePassword"))

	var params request.UpdatePassword

	if err := ctx.ShouldBindJSON(&params); err != nil {
		shared.Warn(LogVal("User", "UpdatePassword", err))
		err = shared.ShouldBindJsonErr
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	token := ctx.Param("token")
	userID, err := shared.JwtParse(token)
	if err != nil {
		err := shared.FailAuthToken
		shared.Warn(LogVal("User", "UpdatePassword", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	err = u.userUsecase.UpdatePassword(params.Password, userID)
	if err != nil {
		shared.Warn(LogVal("User", "UpdatePassword", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	ctx.Status(http.StatusOK)
}

func (u user) UpdateUser(ctx *gin.Context) {
	shared.Debug(LogVal("User", "UpdateUser"))

	var params request.UpdateUser

	if err := ctx.ShouldBindJSON(&params); err != nil {
		shared.Warn(LogVal("User", "UpdatePassword", err))
		err = shared.ShouldBindJsonErr
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	userID, err := shared.AuthUser(ctx)
	if err != nil {
		shared.Warn(LogVal("User", "UpdatePassword", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	if params.Icon != "" {
		filePath := shared.GetFilePath(params.Icon)
		err := u.fileUsecase.IconGet(filePath)
		if err != nil {
			shared.Warn(LogVal("User", "UpdatePassword", err))
			ctx.JSON(http.StatusBadRequest, err.Error())
			return
		}
	}

	err = u.userUsecase.UpdateUser(userID, params.Icon, params.Username, params.Introduction)
	if err != nil {
		shared.Warn(LogVal("User", "UpdatePassword", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	ctx.Status(http.StatusOK)
}

func (u user) Get(ctx *gin.Context) {
	shared.Debug(LogVal("User", "Get"))

	_, err := shared.AuthUser(ctx)
	if err != nil {
		shared.Warn(LogVal("Get", "UpdatePassword", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}
	userID, _ := strconv.Atoi(ctx.Param("id"))

	user, err := u.userUsecase.Get(userID)
	if err != nil {
		shared.Warn(LogVal("Get", "UpdatePassword", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, user)
}
