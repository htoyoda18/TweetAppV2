package middleware

import (
	"encoding/json"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/shared"
)

type requestLog struct {
	RequestPath string `json:"requestPath"`
	Method      string `json:"method"`
	IPAddress   string `json:"ipAddress"`
}

func RequestDetailsLog() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		requestLogger := requestLog{
			RequestPath: ctx.Request.URL.Path,
			Method:      ctx.Request.Method,
			IPAddress:   ctx.ClientIP(),
		}
		requestLogJson, err := json.Marshal(requestLogger)
		if err != nil {
			shared.Error("Log marshing failed: ", err)
		}

		shared.Info("RequestLog: ", string(requestLogJson))

		ctx.Next()
	}
}
