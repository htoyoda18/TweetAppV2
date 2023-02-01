package injector

import "github.com/htoyoda18/TweetAppV2/api/repository"

type Repository struct {
	User repository.User
}

func NewRepository() *Repository {
	userRepository := repository.NewUser()

	return &Repository{
		User: userRepository,
	}
}
