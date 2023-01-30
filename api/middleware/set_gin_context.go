package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/db"
)

func SetGinContextDB() gin.HandlerFunc {
	return func(c *gin.Context) {
		db, err := db.InitDB()
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, err)
			return
		}

		sqlDB, err := db.DB()
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, err)
			return
		}

		defer sqlDB.Close()

		c.Set("db", db)

		c.Next()
	}
}
