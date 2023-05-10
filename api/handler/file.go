package handler

import (
	"fmt"
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/shaerd"
)

// 次は、ファイルをローカルストレージに保存するAPIを作成する
type File interface {
	Upload(*gin.Context)
}

type file struct{}

func NewFile() File {
	return file{}
}

func (u file) Upload(c *gin.Context) {
	shaerd.Info("Upload")

	file, err := c.FormFile("file")
	if err != nil {
		shaerd.Error("Upload", err)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	// ファイルの保存
	fileName := filepath.Base(file.Filename)
	path := fmt.Sprintf("./uploads/icon/%s", fileName)
	if err := c.SaveUploadedFile(file, path); err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.String(http.StatusOK, "fileName", fileName)
}
