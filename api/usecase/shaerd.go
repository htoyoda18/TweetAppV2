package usecase

import "fmt"

func LogVal(val string, args ...interface{}) (string, interface{}) {
	message := fmt.Sprintf("UseCase: %s", fmt.Sprintf(val))
	return message, args
}
