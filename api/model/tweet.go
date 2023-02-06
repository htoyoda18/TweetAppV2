package model

type Tweet struct {
	ModelAt

	ID     int    `json:"id"`
	UserID int    `json:"userID"`
	Tweet  string `json:"tweet"`
	Like   int    `json:"like"`

	Replies []Reply `json:"replies"`
}
