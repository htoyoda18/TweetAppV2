package handler_test

import (
	"os"
	"testing"

	"github.com/htoyoda18/TweetAppV2/api/db"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"github.com/htoyoda18/TweetAppV2/api/shared/test"
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
