package handler

import "fmt"

func LogVal(val string, args ...interface{}) (string, interface{}) {
	message := fmt.Sprintf("Handler: %s", fmt.Sprintf(val))
	return message, args
}
