package handler

import (
	"github.com/gin-gonic/gin"
)

type Ping interface {
	Ping(*gin.Context)
}

type ping struct {
}

func NewPing() Ping {
	return ping{}
}

func (p ping) Ping(c *gin.Context) {
	c.Status(200)
}
