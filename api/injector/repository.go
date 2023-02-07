package injector

import "github.com/htoyoda18/TweetAppV2/api/repository"

type Repository struct {
	User  repository.User
	Tweet repository.Tweet
	Reply repository.Reply
}

func NewRepository() *Repository {
	userRepository := repository.NewUser()
	tweetRepository := repository.NewTweet()
	replyRepository := repository.NewReply()

	return &Repository{
		User:  userRepository,
		Tweet: tweetRepository,
		Reply: replyRepository,
	}
}
