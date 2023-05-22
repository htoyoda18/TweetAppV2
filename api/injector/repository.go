package injector

import (
	"github.com/htoyoda18/TweetAppV2/api/domain/repository"
	"github.com/htoyoda18/TweetAppV2/api/infra/persistence"
)

type Repository struct {
	User  repository.User
	Tweet repository.Tweet
	Reply repository.Reply
	Like  repository.Like
}

func NewRepository() *Repository {
	userRepository := persistence.NewUser()
	tweetRepository := persistence.NewTweet()
	replyRepository := persistence.NewReply()
	likeRepository := persistence.NewLike()

	return &Repository{
		User:  userRepository,
		Tweet: tweetRepository,
		Reply: replyRepository,
		Like:  likeRepository,
	}
}
