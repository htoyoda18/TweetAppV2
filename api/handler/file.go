package handler

import (
	"errors"
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/handler/response"
	"github.com/htoyoda18/TweetAppV2/api/shaerd"
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
		shaerd.Error("Upload", err)
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, response.File{Name: fileName})
}

func (u file) IconGet(c *gin.Context) {
	shaerd.Info("IconGet")

	filePath := "./uploads/icon/" + c.Param("filename")

	_, err := shaerd.AuthUser(c)
	if err != nil {
		shaerd.Error(LogVal("UpdatePassword", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	// ファイルの存在を確認
	_, err = os.Stat(filePath)
	if err != nil {
		if os.IsNotExist(err) {
			shaerd.Error("IconGet", errors.New(shaerd.FailNotFound))
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		shaerd.Error("IconGet", errors.New(shaerd.FailNotOpen))
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.File(filePath)
}
