package response

type Token struct {
	Token string `json:"token"`
}

type LoginResponse struct {
	Token  string `json:"token"`
	UserID int    `json:"userID"`
}
