package injector

import "github.com/htoyoda18/TweetAppV2/api/repository"

type Repository struct {
	User  repository.User
	Tweet repository.Tweet
	Reply repository.Reply
	Like  repository.Like
}

func NewRepository() *Repository {
	userRepository := repository.NewUser()
	tweetRepository := repository.NewTweet()
	replyRepository := repository.NewReply()
	likeRepository := repository.NewLike()

	return &Repository{
		User:  userRepository,
		Tweet: tweetRepository,
		Reply: replyRepository,
		Like:  likeRepository,
	}
}
