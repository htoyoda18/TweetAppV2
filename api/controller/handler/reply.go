package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/controller/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"github.com/htoyoda18/TweetAppV2/api/usecase"
)

type Reply interface {
	Add(*gin.Context)
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

func (r reply) Add(ctx *gin.Context) {
	shared.Debug(LogVal("Reply", "Add"))

	var params request.Reply
	if err := ctx.ShouldBindJSON(&params); err != nil {
		shared.Warn(LogVal("Reply", "Add", err))
		err = shared.ShouldBindJsonErr
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	userID, err := shared.AuthUser(ctx)
	if err != nil {
		shared.Warn(LogVal("Reply", "Add", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	err = r.replyUseCase.Add(userID, params)
	if err != nil {
		shared.Warn(LogVal("Reply", "Add", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	ctx.Status(http.StatusOK)
}
