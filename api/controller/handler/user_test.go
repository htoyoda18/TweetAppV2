package handler_test

import (
	"log"
	"net/http"
	"os"
	"testing"

	"github.com/htoyoda18/TweetAppV2/api/controller/handler/request"
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
	os.Exit(m.Run())
}

func TestUserCreate(t *testing.T) {
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

			var userHandler = injector.NewHandler(gormDB)

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
