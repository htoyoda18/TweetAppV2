package handler_test

import (
	"errors"
	"net/http"
	"net/http/httptest"
	"net/http/httputil"
	"os"
	"os/user"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/controller/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/db"
	"github.com/htoyoda18/TweetAppV2/api/injector"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"github.com/stretchr/testify/mock"
	"gorm.io/gorm"
)

var userHandler *injector.Handler
var gormDB *gorm.DB

func TestMain(m *testing.M) {
	gormDB, _ = db.InitDB()
	shared.ZapSetup()
	os.Exit(m.Run())
}

type MockUserUsecase struct {
	mock.Mock
}

func (m *MockUserUsecase) Create(params request.Signup) (user.User, error) {
	args := m.Called(params)
	return args.Get(0).(user.User), args.Error(1)
}

func TestUserCreate(t *testing.T) {
	tests := []struct {
		name               string
		payload            string
		expectedStatusCode int
		mockUsecase        func() *MockUserUsecase
	}{
		{
			name:               "should return 200",
			payload:            `{"userName":"testUser","email":"test@test.com","password":"password"}`,
			expectedStatusCode: http.StatusOK,
			mockUsecase: func() *MockUserUsecase {
				u := &MockUserUsecase{}
				u.On("Create", mock.AnythingOfType("request.Signup")).Return(request.Signup{Username: "test", Email: "test@test.com", Password: "hogehoge"}, nil)
				return u
			},
		},
		{
			name:               "should return 400",
			payload:            `{"name":"test","email":"test@test.com","password":"password"}`,
			expectedStatusCode: http.StatusBadRequest,
			mockUsecase: func() *MockUserUsecase {
				u := &MockUserUsecase{}
				u.On("Create", mock.AnythingOfType("request.Signup")).Return(user.User{}, errors.New("something went wrong"))
				return u
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req, err := http.NewRequest("POST", "/signup", strings.NewReader(tt.payload))
			if err != nil {
				t.Fatal(err)
			}

			// set up gin context
			w := httptest.NewRecorder()
			c, _ := gin.CreateTestContext(w)
			c.Request = req

			userHandler = injector.NewHandler(gormDB)

			userHandler.User.Create(c)

			res := w.Result()
			defer res.Body.Close()

			if tt.expectedStatusCode != res.StatusCode {
				body, _ := httputil.DumpResponse(res, true)
				t.Fatalf("expected status code %d, got %d, body %s", tt.expectedStatusCode, res.StatusCode, string(body))
			}
		})
	}
}
