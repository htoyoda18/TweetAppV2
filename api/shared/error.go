package shared

import "errors"

var (
	UserNotFound       = errors.New("User not found")
	UserEmailDuplicate = errors.New("User email duplicate")
	EmailNotFound      = errors.New("Email not found")
	FailAuthToken      = errors.New("Fail auth token")
	ShouldBindJsonErr  = errors.New("Should bind JSON error")
	FailToParse        = errors.New("Fail To Parse")
	FailNotFound       = errors.New("Fail Not Found")
	FailNotOpen        = errors.New("Fail Not Open")
	DuplicateLike      = errors.New("Fail Duplicate Like")
	ErrRecordNotFound  = errors.New("record not found")
)
