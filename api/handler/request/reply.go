package request

type Reply struct {
	Reply   string `json:"reply" binding:"required"`
	TweetID int    `json:"tweetID" binding:"required"`
}
