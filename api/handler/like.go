package handler

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/shaerd"
	"github.com/htoyoda18/TweetAppV2/api/usecase"
)

type Like interface {
	Add(*gin.Context)
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
	shaerd.Info("Add")

	var params request.Like

	if err := c.ShouldBindJSON(&params); err != nil {
		shaerd.Error(LogVal("UpdatePassword", err))
		err = errors.New(shaerd.ShouldBindJsonErr)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	userID, err := shaerd.AuthUser(c)
	if err != nil {
		shaerd.Error(LogVal("UpdatePassword", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	if err := l.likeUsecase.Add(
		params,
		userID,
	); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.Status(http.StatusOK)
}

func (l like) Delete(c *gin.Context) {
	shaerd.Info("Delete")

	userID, err := shaerd.AuthUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	tweetID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	if err := l.likeUsecase.Delete(
		userID,
		tweetID,
	); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.Status(http.StatusOK)
}
