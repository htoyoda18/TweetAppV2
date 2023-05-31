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

func TestUpdateUser(t *testing.T) {
	tests := []struct {
		name          string
		body          request.UpdateUser
		responseError error
	}{
		{
			name: "成功:ユーザ情報の更新",
			body: request.UpdateUser{Icon: "ウィスパー.png", Username: "hogehoge", Introduction: "私はhogehogeです"},
		},
		{
			name:          "失敗:ユーザ名が空",
			body:          request.UpdateUser{Icon: "", Username: "", Introduction: ""},
			responseError: shared.ShouldBindJsonErr,
		},
		{
			name:          "失敗:存在しないIconを指定した場合",
			body:          request.UpdateUser{Icon: "hoge.file", Username: "hogehoge", Introduction: ""},
			responseError: shared.FileNotFound,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			token := test.GenerateTestToken()
			statusCode, result := test.APIClientForPost(tt.body, "user/update", token)
			if statusCode == 200 {
				var user *model.User
				gormDB.First(&user, "4")
				assert.Equal(t, tt.body.Username, user.Name)
				assert.Equal(t, tt.body.Introduction, user.Introduction)
				assert.Equal(t, tt.body.Icon, user.Icon)
			} else {
				errMsg, _ := test.ReadErrorResponse(result)
				assert.Equal(t, tt.responseError.Error(), errMsg)
			}
		})
	}
	test.TearDown(gormDB)
}

func TestUserGet(t *testing.T) {
	tests := []struct {
		name          string
		userID        string
		responseError error
		resUser       *model.User
	}{
		{
			name:    "成功:ユーザ情報を取得",
			userID:  "1",
			resUser: &model.User{ID: 1, Name: "ウィスパー", Introduction: "ニョロロン族 / ウワノソラ族。「190年前、正義を気取った僧により悪者とされ封印された“妖怪執事”」を自称する妖怪。", Icon: "ウィスパー.png", Email: "1@example.com"},
		},
		{
			name:          "失敗:存在しないユーザ情報を取得",
			responseError: shared.ErrRecordNotFound,
			userID:        "99",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			token := test.GenerateTestToken()
			statusCode, result := test.APIClientForGet("user/"+tt.userID, token)
			if statusCode == 200 {
				user, _ := test.UnmarshalJSONToStruct[model.User](result)
				assert.Equal(t, tt.resUser.ID, user.ID)
				assert.Equal(t, tt.resUser.Name, user.Name)
				assert.Equal(t, tt.resUser.Email, user.Email)
				assert.Equal(t, tt.resUser.Introduction, user.Introduction)
				assert.Equal(t, tt.resUser.Icon, user.Icon)
			} else {
				errMsg, _ := test.ReadErrorResponse(result)
				assert.Equal(t, tt.responseError.Error(), errMsg)
			}
		})
	}
	test.TearDown(gormDB)
}
