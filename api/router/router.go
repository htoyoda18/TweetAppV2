package router

import (
	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/injector"
	"github.com/htoyoda18/TweetAppV2/api/middleware"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	db := middleware.ConnectDB()

	handler := injector.NewHandler(db)

	v1 := r.Group("v1")
	{
		v1.GET("/", handler.Ping.Ping)
		v1.POST("/signup", handler.User.SignUp)
	}
	return r
}
