package shaerd

import (
	"os"
	"time"

	jwt "github.com/form3tech-oss/jwt-go"
	"github.com/htoyoda18/TweetAppV2/api/model"
)

func NewJwt(user *model.User) string {

	token := jwt.New(jwt.SigningMethodHS256)

	// claimsのセット
	claims := token.Claims.(jwt.MapClaims)
	claims["admin"] = true
	claims["name"] = user.Name
	claims["sub"] = user.ID
	claims["email"] = user.Email
	claims["iat"] = time.Now().Unix()
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	// 電子署名
	tokenString, _ := token.SignedString([]byte(os.Getenv("JWTKEY")))

	return tokenString
}
