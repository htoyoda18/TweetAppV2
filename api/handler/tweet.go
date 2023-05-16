package handler

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/model"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"github.com/htoyoda18/TweetAppV2/api/usecase"
)

type Tweet interface {
	Create(*gin.Context)
	List(*gin.Context)
	ListUser(*gin.Context)
	Get(*gin.Context)
}

type tweet struct {
	tweetUseCase usecase.Tweet
}

func NewTweet(
	tweetUseCase usecase.Tweet,
) Tweet {
	return tweet{
		tweetUseCase: tweetUseCase,
	}
}

func (t tweet) Create(c *gin.Context) {
	shared.Debug(LogVal("Tweet", "Create"))

	var params request.Tweet
	if err := c.ShouldBindJSON(&params); err != nil {
		shared.Warn(LogVal("Tweet", "", err))
		err = errors.New(shared.ShouldBindJsonErr)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	userID, err := shared.AuthUser(c)
	if err != nil {
		shared.Warn(LogVal("Tweet", "", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	err = t.tweetUseCase.Create(userID, params.Tweet)
	if err != nil {
		shared.Warn(LogVal("Tweet", "", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.Status(http.StatusOK)
}

func (t tweet) List(c *gin.Context) {
	shared.Debug(LogVal("Tweet", "List"))

	_, err := shared.AuthUser(c)
	if err != nil {
		shared.Warn(LogVal("Tweet", "", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	tweets, err := t.tweetUseCase.List(nil)
	if err != nil {
		shared.Warn(LogVal("Tweet", "", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, tweets)
}

// userIDに紐づくツイートを取得する
func (t tweet) ListUser(c *gin.Context) {
	shared.Debug(LogVal("Tweet", "ListUser"))

	_, err := shared.AuthUser(c)
	if err != nil {
		shared.Warn(LogVal("Tweet", "", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}
	userID, _ := strconv.Atoi(c.Param("userID"))

	tweets, err := t.tweetUseCase.List(&model.Tweet{
		UserID: userID,
	})
	if err != nil {
		shared.Warn(LogVal("Tweet", "", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, tweets)
}

func (t tweet) Get(c *gin.Context) {
	shared.Debug(LogVal("Tweet", "Get"))

	_, err := shared.AuthUser(c)
	if err != nil {
		shared.Warn(LogVal("Tweet", "", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	tweetID, _ := strconv.Atoi(c.Param("id"))

	tweet, err := t.tweetUseCase.Get(tweetID)
	if err != nil {
		shared.Warn(LogVal("Tweet", "", err))
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, tweet)
}
