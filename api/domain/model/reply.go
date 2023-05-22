package model

type Reply struct {
	ModelAt

	ID      int    `json:"id"`
	TweetID int    `json:"tweetID"`
	UserID  int    `json:"userID"`
	Reply   string `json:"reply"`

	User *User `json:"user"`
}
