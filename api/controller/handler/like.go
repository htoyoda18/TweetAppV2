package handler

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/controller/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/controller/handler/response"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"github.com/htoyoda18/TweetAppV2/api/usecase"
	"gorm.io/gorm"
)

type Like interface {
	Add(*gin.Context)
	GetIsLikedByUser(*gin.Context)
	Delete(*gin.Context)
}

type like struct {
	likeUsecase usecase.Like
}

func NewLike(
	likeUsecase usecase.Like,
) Like {
	return like{
		likeUsecase: likeUsecase,
	}
}

func (l like) Add(ctx *gin.Context) {
	shared.Debug(LogVal("Like", "Add"))

	var params request.Like

	if err := ctx.ShouldBindJSON(&params); err != nil {
		shared.Warn(LogVal("Like", "Add", err))
		err = shared.ShouldBindJsonErr
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	userID, err := shared.AuthUser(ctx)
	if err != nil {
		shared.Warn(LogVal("Like", "Add", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	if err := l.likeUsecase.Add(
		params,
		userID,
	); err != nil {
		shared.Warn(LogVal("Like", "Add", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	ctx.Status(http.StatusOK)
}

func (l like) Delete(ctx *gin.Context) {
	shared.Debug(LogVal("Like", "Delete"))

	userID, err := shared.AuthUser(ctx)
	if err != nil {
		shared.Warn(LogVal("Like", "Delete", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}
	tweetID, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		shared.Warn(LogVal("Like", "Delete", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	if err := l.likeUsecase.Delete(
		userID,
		tweetID,
	); errors.Is(err, gorm.ErrRecordNotFound) {
		shared.Warn(LogVal("Like", "Get", err))
		ctx.JSON(http.StatusOK, response.IsLikedByUser{IsLikedByUser: false})
		return
	} else if err != nil {
		shared.Warn(LogVal("Like", "Delete", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	ctx.Status(http.StatusOK)
}

// Note: レコードが存在しない場合に、親のレコードがそもそも存在しないということを考慮していない
func (l like) GetIsLikedByUser(ctx *gin.Context) {
	shared.Debug(LogVal("Like", "Get"))

	userID, err := shared.AuthUser(ctx)
	if err != nil {
		shared.Warn(LogVal("Like", "Get", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	var paramsUrl request.GetLike

	if err := ctx.ShouldBindUri(&paramsUrl); err != nil {
		shared.Warn(LogVal("Like", "Get", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}
	if err != nil {
		shared.Warn(LogVal("Like", "Get", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	if err := l.likeUsecase.GetIsLikedByUser(
		userID,
		paramsUrl.TweetID,
	); errors.Is(err, gorm.ErrRecordNotFound) {
		shared.Warn(LogVal("Like", "Get", err))
		ctx.JSON(http.StatusOK, response.IsLikedByUser{IsLikedByUser: false})
		return
	} else if err != nil {
		shared.Error(LogVal("Like", "Get", err))
		ctx.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, response.IsLikedByUser{IsLikedByUser: true})
}
