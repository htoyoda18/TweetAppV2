package injector

import "github.com/htoyoda18/TweetAppV2/api/repository"

type Repository struct {
	User  repository.User
	Tweet repository.Tweet
}

func NewRepository() *Repository {
	userRepository := repository.NewUser()
	tweetRepository := repository.NewTweet()

	return &Repository{
		User:  userRepository,
		Tweet: tweetRepository,
	}
}
