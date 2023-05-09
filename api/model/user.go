package model

type User struct {
	ModelAt

	ID           int    `json:"id"`
	Name         string `json:"name"`
	Email        string `json:"email"`
	Introduction string `json:"introduction"`
	Icon         string `json:"icon"`
	Password     string `json:"-"`
}
