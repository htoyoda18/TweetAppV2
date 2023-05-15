package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/shared"
)

func LoggerMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		shared.Setup()

		c.Next()
	}
}
