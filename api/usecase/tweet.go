package usecase

import (
	"log"

	"github.com/htoyoda18/TweetAppV2/api/model"
	"github.com/htoyoda18/TweetAppV2/api/repository"
	"gorm.io/gorm"
)

type Tweet interface {
	TweetPost(userID int, tweet string) error
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

func (t tweet) TweetPost(userID int, tweet string) error {
	err := t.tweetRepository.Add(&model.Tweet{
		UserID: userID,
		Tweet:  tweet,
	}, t.db)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

func (t tweet) List(where *model.Tweet) ([]*model.Tweet, error) {
	tweet, err := t.tweetRepository.List(where, t.db)
	if err != nil {
		log.Println(err)
		return tweet, err
	}

	return tweet, nil
}

func (t tweet) Get(tweetID int) (*model.Tweet, error) {
	tweet, err := t.tweetRepository.Get(tweetID, t.db)
	if err != nil {
		log.Println(err)
		return tweet, err
	}

	return tweet, nil
}
