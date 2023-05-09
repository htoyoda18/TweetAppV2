package model

type User struct {
	ModelAt

	ID       int    `json:"id"`
	Icon     string `json:"icon"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"-"`
}
