package handler

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/model"
	"github.com/htoyoda18/TweetAppV2/api/shaerd"
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
	shaerd.Info("Create")

	var params request.Tweet
	if err := c.ShouldBindJSON(&params); err != nil {
		shaerd.Error("Create", err)
		err = errors.New(shaerd.ShouldBindJSONErr)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	userID, err := shaerd.AuthUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	err = t.tweetUseCase.Create(userID, params.Tweet)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	c.Status(http.StatusOK)
}

func (t tweet) List(c *gin.Context) {
	shaerd.Info("List")

	_, err := shaerd.AuthUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	tweets, err := t.tweetUseCase.List(nil)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	c.JSON(http.StatusOK, tweets)
}

// userIDに紐づくツイートを取得する
func (t tweet) ListUser(c *gin.Context) {
	shaerd.Info("ListUser")

	_, err := shaerd.AuthUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}
	userID, _ := strconv.Atoi(c.Param("userID"))

	tweets, err := t.tweetUseCase.List(&model.Tweet{
		UserID: userID,
	})
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	c.JSON(http.StatusOK, tweets)
}

func (t tweet) Get(c *gin.Context) {
	shaerd.Info("Get")

	_, err := shaerd.AuthUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	tweetID, _ := strconv.Atoi(c.Param("id"))

	tweet, err := t.tweetUseCase.Get(tweetID)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	c.JSON(http.StatusOK, tweet)
}
