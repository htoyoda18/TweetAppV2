package middleware

import (
	"encoding/json"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/shared"
)

type requestLog struct {
	RequestPath string      `json:"requestPath"`
	Method      string      `json:"method"`
	RequestBody interface{} `json:"requestBody"`
	UserID      int         `json:"userID"`
	IPAddress   string      `json:"ipAddress"`
}

func RequestDetailsLog() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestLogger := requestLog{
			RequestPath: c.Request.URL.Path,
			Method:      c.Request.Method,
			RequestBody: c.Request.Body,
			IPAddress:   c.ClientIP(),
		}
		requestLogJson, err := json.Marshal(requestLogger)
		if err != nil {
			shared.Error("Log marshing failed: ", err)
		}

		shared.Info("RequestLog: ", string(requestLogJson))

		c.Next()
	}
}
