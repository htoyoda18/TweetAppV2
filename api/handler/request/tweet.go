package request

type Tweet struct {
	Tweet string `json:"tweet" binding:"required"`
}
