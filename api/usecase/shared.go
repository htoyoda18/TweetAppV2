package usecase

import "fmt"

func LogVal(val1, val2 string, args ...interface{}) (string, interface{}) {
	message := fmt.Sprintf("UseCase: %s %s", val1, val2)
	return message, args
}
