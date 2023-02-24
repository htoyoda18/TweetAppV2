package request

type Signup struct {
	Username string `json:"userName" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type Login struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type PasswordReset struct {
	Email string `json:"email" binding:"required,email"`
}

type UpdatePassword struct {
	Password string `json:"password" binding:"required"`
}
