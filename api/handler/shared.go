package handler

import "fmt"

func LogVal(val, val2 string, args ...interface{}) (string, interface{}) {
	message := fmt.Sprintf("Handler: %s %s", val, val2)
	return message, args
}
