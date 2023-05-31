package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/shared"
)

type Ping interface {
	Ping(*gin.Context)
}

type ping struct{}

func NewPing() Ping {
	return ping{}
}

func (p ping) Ping(ctx *gin.Context) {
	shared.Debug(LogVal("Ping", "Ping"))

	ctx.Status(200)
}
