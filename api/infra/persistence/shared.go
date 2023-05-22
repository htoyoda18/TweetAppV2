package persistence

import "fmt"

func LogVal(val1, var2 string, args ...interface{}) (string, interface{}) {
	message := fmt.Sprintf("Repository: %s %s", val1, var2)
	return message, args
}
