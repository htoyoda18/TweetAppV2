package handler_test

import (
	"log"
	"net/http"
	"os"
	"testing"

	"github.com/htoyoda18/TweetAppV2/api/controller/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/controller/handler/response"
	"github.com/htoyoda18/TweetAppV2/api/db"
	"github.com/htoyoda18/TweetAppV2/api/domain/model"
	"github.com/htoyoda18/TweetAppV2/api/injector"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"github.com/htoyoda18/TweetAppV2/api/shared/test"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

var userHandler *injector.Handler
var gormDB *gorm.DB

func TestMain(m *testing.M) {
	gormDB, _ = db.InitDB()
	shared.ZapSetup()
	userHandler = injector.NewHandler(gormDB)
	os.Exit(m.Run())
}

func TestUserCreate(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name          string
		body          request.Signup
		responseError error
	}{
		{
			name: "成功",
			body: request.Signup{Username: "testUser", Password: "hogehoge", Email: "hoge@mail.com"},
		},
		{
			name:          "失敗: パスワードが短い",
			body:          request.Signup{Username: "testUser", Password: "hoge", Email: "hoge@mail.com"},
			responseError: shared.ShouldBindJsonErr,
		},
		{
			name:          "失敗: 同じメールアドレスを登録しようとした",
			body:          request.Signup{Username: "testUser", Password: "hogehoge", Email: "hoge@mail.com"},
			responseError: shared.UserEmailDuplicate,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			c, w, err := test.CreateGinContextForPost(tt.body, "signup")
			if err != nil {
				log.Fatal(err)
			}

			userHandler.User.Create(c)

			res := w.Result()
			defer res.Body.Close()

			if res.StatusCode == http.StatusOK {
				response, err := test.UnmarshalJSONToStruct[model.User](w)
				if err != nil {
					log.Fatal(err)
				}
				assert.Equal(t, "testUser", response.Name)
				assert.Equal(t, "hoge@mail.com", response.Email)
			} else {
				response, err := test.ReadErrorResponse(w)
				if err != nil {
					log.Fatal(err)
				}
				assert.Equal(t, tt.responseError.Error(), response)
			}
		})
	}
	test.TearDown(gormDB)
}

func TestUserLogin(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name          string
		body          request.Login
		responseError error
	}{
		{
			name: "成功",
			body: request.Login{Email: "5@example.com", Password: "hogehoge"},
		},
		{
			name:          "失敗: パスワードが間違っている",
			body:          request.Login{Email: "5@example.com", Password: "hogehoge1111"},
			responseError: shared.FailPassword,
		},
		{
			name:          "失敗: 存在しないメールアドレスでログインしようとする",
			body:          request.Login{Email: "5555@example.com", Password: "hogehoge"},
			responseError: shared.EmailNotFound,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			c, w, err := test.CreateGinContextForPost(tt.body, "login")
			if err != nil {
				log.Fatal(err)
			}

			userHandler.User.Login(c)

			res := w.Result()
			defer res.Body.Close()

			if res.StatusCode == http.StatusOK {
				response, err := test.UnmarshalJSONToStruct[response.LoginResponse](w)
				if err != nil {
					log.Fatal(err)
				}
				assert.Equal(t, 5, response.UserID)
			} else {
				response, err := test.ReadErrorResponse(w)
				if err != nil {
					log.Fatal(err)
				}
				assert.Equal(t, tt.responseError.Error(), response)
			}
		})
	}
	test.TearDown(gormDB)
}
