package middleware

import (
	"encoding/json"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/shared"
)

type responseLog struct {
	StatusCode      int           `json:"statusCode"`
	RequestDuration time.Duration `json:"requestTime"`
	URL             string        `json:"url"`
	Method          string        `json:"method"`
}

func ResponseLogInfo() gin.HandlerFunc {
	return func(c *gin.Context) {
		startTime := time.Now()

		c.Next()

		duration := time.Since(startTime)
		responseLog := responseLog{
			StatusCode:      c.Writer.Status(),
			RequestDuration: duration,
			URL:             c.Request.URL.Path,
			Method:          c.Request.Method,
		}

		responseLogJson, err := json.Marshal(responseLog)
		if err != nil {
			shared.Error("Log marshing failed: ", err)
		}

		shared.Info("ResponseLog: ", string(responseLogJson))
	}
}
