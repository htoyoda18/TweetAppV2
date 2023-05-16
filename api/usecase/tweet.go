package usecase

import (
	"github.com/htoyoda18/TweetAppV2/api/model"
	"github.com/htoyoda18/TweetAppV2/api/repository"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"gorm.io/gorm"
)

type Tweet interface {
	Create(userID int, tweet string) error
	List(where *model.Tweet) ([]*model.Tweet, error)
	Get(tweetID int) (*model.Tweet, error)
}

type tweet struct {
	tweetRepository repository.Tweet
	db              *gorm.DB
}

func NewTweet(
	tweetRepository repository.Tweet,
	db *gorm.DB,
) Tweet {
	return tweet{
		tweetRepository: tweetRepository,
		db:              db,
	}
}

func (t tweet) Create(userID int, tweet string) error {
	shared.Debug(LogVal("Tweet", "Create"))

	err := t.tweetRepository.Add(&model.Tweet{
		UserID: userID,
		Tweet:  tweet,
	}, t.db)
	if err != nil {
		shared.Warn(LogVal("Tweet", "Create", err))
		return err
	}

	return nil
}

func (t tweet) List(where *model.Tweet) ([]*model.Tweet, error) {
	shared.Debug(LogVal("Tweet", "List"))

	tweet, err := t.tweetRepository.List(where, t.db)
	if err != nil {
		shared.Warn(LogVal("Tweet", "List", err))
		return tweet, err
	}

	return tweet, nil
}

func (t tweet) Get(tweetID int) (*model.Tweet, error) {
	shared.Debug(LogVal("Tweet", "Get"))

	tweet, err := t.tweetRepository.Get(tweetID, t.db)
	if err != nil {
		shared.Warn(LogVal("Tweet", "Get", err))
		return tweet, err
	}

	return tweet, nil
}
