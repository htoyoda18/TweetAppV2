package request

type Signup struct {
	Username string `json:"userName"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
