package usecase

import (
	"github.com/htoyoda18/TweetAppV2/api/controller/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/model"
	"github.com/htoyoda18/TweetAppV2/api/repository"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"gorm.io/gorm"
)

type Like interface {
	Add(params request.Like, userID int) error
	Delete(userID int, tweetID int) error
	Get(userID int, tweetID int) error
}

type like struct {
	likeRepository repository.Like
	db             *gorm.DB
}

func NewLike(
	likeRepository repository.Like,
	db *gorm.DB,
) Like {
	return like{
		likeRepository: likeRepository,
		db:             db,
	}
}

func (l like) Add(params request.Like, userID int) error {
	shared.Debug(LogVal("Like", "Add"))

	if like, _ := l.likeRepository.Get(&model.Like{
		TweetID: params.TweetID,
		UserID:  userID,
	}, l.db); like != nil {
		err := shared.DuplicateLike
		shared.Warn(LogVal("Like", "Add: Fail Duplicate Like", err))
		return err
	}

	if err := l.likeRepository.Add(&model.Like{
		TweetID: params.TweetID,
		UserID:  userID,
	}, l.db); err != nil {
		shared.Warn(LogVal("Like", "Add", err))
		return err
	}

	return nil
}

func (l like) Delete(userID int, tweetID int) error {
	shared.Debug(LogVal("Like", "Delete"))

	like, err := l.likeRepository.Get(&model.Like{
		TweetID: tweetID,
		UserID:  userID,
	}, l.db)
	if err != nil {
		shared.Warn(LogVal("Like", "Delete", err))
		return err
	}

	if err := l.likeRepository.Delete(like, l.db); err != nil {
		shared.Warn(LogVal("Like", "Delete", err))
		return err
	}

	return nil
}

func (l like) Get(userID int, tweetID int) error {
	shared.Debug(LogVal("Like", "Get"))

	_, err := l.likeRepository.Get(&model.Like{
		TweetID: tweetID,
		UserID:  userID,
	}, l.db)
	if err != nil {
		shared.Warn(LogVal("Like", "Get", err))
		return err
	}

	return nil
}
