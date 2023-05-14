package handler

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"github.com/htoyoda18/TweetAppV2/api/usecase"
)

type Reply interface {
	Add(c *gin.Context)
}

type reply struct {
	replyUseCase usecase.Reply
}

func NewReply(
	replyUseCase usecase.Reply,
) Reply {
	return reply{
		replyUseCase: replyUseCase,
	}
}

func (r reply) Add(c *gin.Context) {
	shared.Info("Add")

	var params request.Reply
	if err := c.ShouldBindJSON(&params); err != nil {
		shared.Error(LogVal("Add", err))
		err = errors.New(shared.ShouldBindJsonErr)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	userID, err := shared.AuthUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	err = r.replyUseCase.Add(userID, params)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.Status(http.StatusOK)
}
