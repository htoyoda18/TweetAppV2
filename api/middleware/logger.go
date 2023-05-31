package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/shared"
)

func LoggerMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		shared.ZapSetup()

		ctx.Next()
	}
}
