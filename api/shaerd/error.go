package shaerd

import "errors"

const UserNotFound = "User not found"
const UserEmailDuplicate = "User email duplicate"
const EmailNotFound = "Email not found"
const FailAuthToken = "Fail auth token"
const ShouldBindJsonErr = "Should bind JSON error"
const FailToParse = "Fail To Parse"
const FailNotFound = "Fail Not Found"
const FailNotOpen = "Fail Not Open"
const DuplicateLike = "Fail Duplicate Like"

var ErrRecordNotFound = errors.New("record not found")
