package router

import (
	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/injector"
)

func SetupRouter() *gin.Engine {
	handler := injector.NewHandler()
	r := gin.Default()

	v1 := r.Group("v1")
	{
		v1.GET("/", handler.Ping.Ping)
	}
	return r
}
