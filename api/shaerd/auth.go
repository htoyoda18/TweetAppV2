package shaerd

import (
	"errors"
	"log"
	"os"
	"strings"
	"time"

	jwt "github.com/form3tech-oss/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/model"
)

func NewJwt(user *model.User, expiration int64) string {

	token := jwt.New(jwt.SigningMethodHS256)

	// claimsのセット
	claims := token.Claims.(jwt.MapClaims)
	claims["admin"] = true
	claims["name"] = user.Name
	claims["sub"] = user.ID
	claims["email"] = user.Email
	claims["iat"] = time.Now().Unix()
	claims["exp"] = expiration

	// 電子署名
	tokenString, _ := token.SignedString([]byte(os.Getenv("JWTKEY")))

	return tokenString
}

func JwtParse(tokenString string) (int, error) {
	var userID int

	token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			log.Printf(FailAuthToken)
		}
		return []byte(os.Getenv("JWTKEY")), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userID = int(claims["sub"].(float64))
	} else {
		log.Printf(FailAuthToken)
	}

	return userID, nil
}

func AuthUser(c *gin.Context) (int, error) {
	cookie := c.Request.Header.Get("Authorization")
	arrCookie := strings.Split(cookie, "Bearer ")
	userID, err := JwtParse(arrCookie[1])
	if err != nil {
		log.Printf(FailAuthToken)
		err = errors.New(FailAuthToken)
		return 0, err
	}
	return userID, nil
}
