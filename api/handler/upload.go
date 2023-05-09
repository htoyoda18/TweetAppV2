package handler

import (
	"fmt"
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/shaerd"
)

// 次は、ファイルをローカルストレージに保存するAPIを作成する
type Upload interface {
	UploadFile(*gin.Context)
}

type upload struct{}

func NewUpload() Upload {
	return upload{}
}

func (u upload) UploadFile(c *gin.Context) {
	shaerd.Info("UploadFile")

	file, err := c.FormFile("file")
	if err != nil {
		shaerd.Error("UploadFile", err)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	// ファイルの保存
	filename := filepath.Base(file.Filename)
	path := fmt.Sprintf("../uploads/icon/%s", filename)
	if err := c.SaveUploadedFile(file, path); err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.Status(http.StatusOK)
}
