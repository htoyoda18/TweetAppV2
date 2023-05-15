package repository

import "fmt"

func LogVal(val string, args ...interface{}) (string, interface{}) {
	message := fmt.Sprintf("Repository: %s", fmt.Sprintf(val))
	return message, args
}
