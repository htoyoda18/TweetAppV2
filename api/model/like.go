package model

type Like struct {
	ModelAt

	ID      int `json:"id"`
	UserID  int `json:"userID"`
	TweetID int `json:"tweetID"`
}
