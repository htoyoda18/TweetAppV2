package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/injector"
	"github.com/htoyoda18/TweetAppV2/api/middleware"
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
	r.Use(middleware.LoggerMiddleware())

	v1 := r.Group("v1")
	{
		v1.GET("/", handler.Ping.Ping)
		v1.GET("/user/:id", handler.User.Get)
		v1.POST("/signup", handler.User.Create)
		v1.POST("/login", handler.User.Login)
		v1.POST("/password_reset", handler.User.PasswordReset)
		v1.POST("/password_update/:token", handler.User.UpdatePassword)
		v1.POST("/user/update", handler.User.UpdateUser)
		v1.POST("/tweet", handler.Tweet.Create)
		v1.GET("/tweet", handler.Tweet.List)
		v1.GET("/tweet/:userID", handler.Tweet.ListUser)
		v1.GET("/tweet_detail/:id", handler.Tweet.Get)
		v1.POST("/reply", handler.Reply.Add)
		v1.GET("/validate_token", handler.Token.ValidateToken)
	}
	return r
}
