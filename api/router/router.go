package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/injector"
	"gorm.io/gorm"
)

func SetupRouter(db *gorm.DB) *gin.Engine {
	r := gin.Default()

	handler := injector.NewHandler(db)
	r.HandleMethodNotAllowed = true
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"*"},
		AllowCredentials: true,
	}))

	v1 := r.Group("v1")
	{
		v1.GET("/", handler.Ping.Ping)
		v1.POST("/signup", handler.User.SignUp)
	}
	return r
}
