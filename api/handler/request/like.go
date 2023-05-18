package request

type Like struct {
	TweetID int `json:"tweetID" binding:"required"`
}

type GetLike struct {
	TweetID int `json:"id" binding:"required,gt=0"`
}
