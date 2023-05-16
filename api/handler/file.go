package handler

import (
	"errors"
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/handler/response"
	"github.com/htoyoda18/TweetAppV2/api/shared"
)

// 次は、ファイルをローカルストレージに保存するAPIを作成する
type File interface {
	Upload(*gin.Context)
	IconGet(*gin.Context)
}

type file struct{}

func NewFile() File {
	return file{}
}

func (u file) Upload(c *gin.Context) {
	shared.Debug(LogVal("File", "Upload"))

	file, err := c.FormFile("file")
	if err != nil {
		shared.Warn(LogVal("File", "Upload", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	// ファイルの保存
	fileName := filepath.Base(file.Filename)
	path := fmt.Sprintf("./uploads/icon/%s", fileName)
	if err := c.SaveUploadedFile(file, path); err != nil {
		shared.Warn(LogVal("File", "Upload", err))
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, response.File{Name: fileName})
}

func (u file) IconGet(c *gin.Context) {
	shared.Debug(LogVal("File", "IconGet"))

	filePath := "./uploads/icon/" + c.Param("filename")

	_, err := shared.AuthUser(c)
	if err != nil {
		shared.Warn(LogVal("File", "IconGet", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	// ファイルの存在を確認
	_, err = os.Stat(filePath)
	if err != nil {
		if os.IsNotExist(err) {
			shared.Warn(LogVal("File", "IconGet", errors.New(shared.FailNotFound)))
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		shared.Error(LogVal("File", "IconGet", errors.New(shared.FailNotOpen)))
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.File(filePath)
}
