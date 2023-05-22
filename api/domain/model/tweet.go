package model

type Tweet struct {
	ModelAt

	ID     int    `json:"id"`
	UserID int    `json:"userID"`
	Tweet  string `json:"tweet"`

	User    *User    `json:"user"`
	Replies []*Reply `json:"replies"`
	Likes   []*Like  `json:"likes"`
}
