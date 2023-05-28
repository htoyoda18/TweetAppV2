package handler_test

import (
	"os"
	"testing"

	"github.com/htoyoda18/TweetAppV2/api/controller/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/controller/handler/response"
	"github.com/htoyoda18/TweetAppV2/api/db"
	"github.com/htoyoda18/TweetAppV2/api/domain/model"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"github.com/htoyoda18/TweetAppV2/api/shared/test"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

var gormDB *gorm.DB

func TestMain(m *testing.M) {
	shared.ZapSetup()
	test.ReadEnvFile()
	dbConnection, _ := test.GetDatabaseConnectionTest()
	gormDB, _ = db.InitDB(dbConnection)
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
			name: "成功:ユーザを作成する",
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
			statusCode, result := test.APIClientForPost(tt.body, "signup")
			if statusCode == 200 {
				user, _ := test.UnmarshalJSONToStruct[model.User](result)
				assert.Equal(t, tt.body.Username, user.Name)
				assert.Equal(t, tt.body.Email, user.Email)
			} else {
				errMsg, _ := test.ReadErrorResponse(result)
				assert.Equal(t, tt.responseError.Error(), errMsg)
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
			name: "成功:ログインする",
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
			statusCode, result := test.APIClientForPost(tt.body, "login")
			if statusCode == 200 {
				loginResponse, _ := test.UnmarshalJSONToStruct[response.LoginResponse](result)
				assert.Equal(t, 5, loginResponse.UserID)
			} else {
				errMsg, _ := test.ReadErrorResponse(result)
				assert.Equal(t, tt.responseError.Error(), errMsg)
			}
		})
	}
	test.TearDown(gormDB)
}

func TestPasswordReset(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name          string
		body          request.PasswordReset
		responseError error
	}{
		{
			name: "成功:パスワードリセットメールを送信する",
			body: request.PasswordReset{Email: "5@example.com"},
		},
		{
			name:          "失敗:存在しないメールアドレスでパスワードリセットしようとする",
			body:          request.PasswordReset{Email: "xxxxx@example.com"},
			responseError: shared.EmailNotFound,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			statusCode, result := test.APIClientForPost(tt.body, "password_reset")
			if statusCode == 200 {
				//メールの検証が必要
			} else {
				errMsg, _ := test.ReadErrorResponse(result)
				assert.Equal(t, tt.responseError.Error(), errMsg)
			}
		})
	}
	test.TearDown(gormDB)
}

func TestUpdatePasswordr(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name          string
		body          request.UpdatePassword
		token         string
		responseError error
	}{
		{
			name:          "成功: パスワードの更新",
			body:          request.UpdatePassword{Password: "hogehoge"},
			token:         test.GenerateTestToken(),
			responseError: shared.ShouldBindJsonErr,
		},
		{
			name:          "失敗:パスワード短い",
			body:          request.UpdatePassword{Password: "hoge"},
			token:         test.GenerateTestToken(),
			responseError: shared.ShouldBindJsonErr,
		},
		{
			name:          "失敗:不正なトークン",
			body:          request.UpdatePassword{Password: "hogehoge"},
			token:         "hogehoge",
			responseError: shared.FailAuthToken,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			statusCode, result := test.APIClientForPost(tt.body, "password_update/"+tt.token)
			if statusCode == 200 {
				//ここはテストが必要
			} else {
				errMsg, _ := test.ReadErrorResponse(result)
				assert.Equal(t, tt.responseError.Error(), errMsg)
			}
		})
	}
	test.TearDown(gormDB)
}
