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
		v1.GET("/user/:id", handler.User.Get)
		v1.POST("/signup", handler.User.SignUp)
		v1.POST("/login", handler.User.Login)
		v1.POST("/password_reset", handler.User.PasswordReset)
		v1.POST("/password_update/:token", handler.User.PasswordUpdate)
		v1.POST("/tweet", handler.Tweet.TweetPost)
		v1.GET("/tweet", handler.Tweet.List)
		v1.GET("/tweet_detail/:id", handler.Tweet.Get)
		v1.POST("/reply", handler.Reply.Add)
	}
	return r
}
