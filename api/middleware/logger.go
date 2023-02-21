package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/shaerd"
)

func LoggerMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		shaerd.Setup()

		c.Next()
	}
}
