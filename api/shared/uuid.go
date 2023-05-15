package shared

import (
	"fmt"

	"github.com/google/uuid"
)

func NewUUID() (string, error) {
	u, err := uuid.NewRandom()
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	uu := u.String()
	return uu, err
}
