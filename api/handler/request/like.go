package request

type Like struct {
	TweetID int `json:"tweetID" binding:"required"`
}
