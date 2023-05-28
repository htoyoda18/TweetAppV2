package usecase

import (
	"os"

	"github.com/htoyoda18/TweetAppV2/api/shared"
)

type File interface {
	IconGet(filePath string) error
}

type file struct{}

func NewFile() File {
	return file{}
}

func (u file) IconGet(filePath string) error {
	// ファイルの存在を確認
	_, err := os.Stat(filePath)
	if err != nil {
		if os.IsNotExist(err) {
			shared.Error(LogVal("File", "IconGet", shared.FailNotFound))
			return err
		}
		shared.Warn(LogVal("File", "IconGet", shared.FileNotOpen))
		return err
	}
	return nil
}
