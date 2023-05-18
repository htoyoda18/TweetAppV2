package handler

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/handler/response"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"github.com/htoyoda18/TweetAppV2/api/usecase"
	"gorm.io/gorm"
)

type Like interface {
	Add(*gin.Context)
	Get(*gin.Context)
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

func (l like) Add(c *gin.Context) {
	shared.Debug(LogVal("Like", "Add"))

	var params request.Like

	if err := c.ShouldBindJSON(&params); err != nil {
		shared.Warn(LogVal("Like", "Add", err))
		err = shared.ShouldBindJsonErr
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	userID, err := shared.AuthUser(c)
	if err != nil {
		shared.Warn(LogVal("Like", "Add", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	if err := l.likeUsecase.Add(
		params,
		userID,
	); err != nil {
		shared.Warn(LogVal("Like", "Add", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.Status(http.StatusOK)
}

func (l like) Delete(c *gin.Context) {
	shared.Debug(LogVal("Like", "Delete"))

	userID, err := shared.AuthUser(c)
	if err != nil {
		shared.Warn(LogVal("Like", "Delete", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	tweetID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		shared.Warn(LogVal("Like", "Delete", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	if err := l.likeUsecase.Delete(
		userID,
		tweetID,
	); errors.Is(err, gorm.ErrRecordNotFound) {
		shared.Warn(LogVal("Like", "Get", err))
		c.JSON(http.StatusOK, response.IsLikedByUser{IsLikedByUser: false})
		return
	} else if err != nil {
		shared.Warn(LogVal("Like", "Delete", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.Status(http.StatusOK)
}

func (l like) Get(c *gin.Context) {
	shared.Debug(LogVal("Like", "Get"))

	userID, err := shared.AuthUser(c)
	if err != nil {
		shared.Warn(LogVal("Like", "Get", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	var paramsUrl request.GetLike

	if err := c.ShouldBindUri(&paramsUrl); err != nil {
		shared.Warn(LogVal("Like", "Get", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	if err != nil {
		shared.Warn(LogVal("Like", "Get", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	if err := l.likeUsecase.Get(
		userID,
		paramsUrl.TweetID,
	); errors.Is(err, gorm.ErrRecordNotFound) {
		shared.Warn(LogVal("Like", "Get", err))
		c.JSON(http.StatusOK, response.IsLikedByUser{IsLikedByUser: false})
		return
	} else if err != nil {
		shared.Error(LogVal("Like", "Get", err))
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, response.IsLikedByUser{IsLikedByUser: true})
}
