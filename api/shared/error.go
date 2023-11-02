package shared

import "errors"

var (
	UserNotFound       = errors.New("User not found")
	UserEmailDuplicate = errors.New("User email duplicate")
	EmailNotFound      = errors.New("Email not found")
	ShouldBindJsonErr  = errors.New("Should bind JSON error")
	InvalidPassword    = errors.New("Invalid password")
	DuplicateLike      = errors.New("Fail Duplicate Like")
	FailAuthToken      = errors.New("Fail auth token")
	FailPassword       = errors.New("Fail password")
	FailToParse        = errors.New("Fail To Parse")
	FileNotFound       = errors.New("File Not Found")
	FileNotOpen        = errors.New("File Not Open")
	ErrRecordNotFound  = errors.New("record not found")
)
