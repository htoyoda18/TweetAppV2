package handler

import (
	"errors"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/shaerd"
	"github.com/htoyoda18/TweetAppV2/api/usecase"
)

type Tweet interface {
	TweetPost(*gin.Context)
	List(*gin.Context)
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

func (t tweet) TweetPost(c *gin.Context) {
	var params request.Tweet
	if err := c.ShouldBindJSON(&params); err != nil {
		log.Println(err)
		err = errors.New(shaerd.ShouldBindJSONErr)
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	userID, err := shaerd.AuthUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	err = t.tweetUseCase.TweetPost(userID, params.Tweet)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	c.Status(http.StatusOK)
}

func (t tweet) List(c *gin.Context) {
	_, err := shaerd.AuthUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	tweets, err := t.tweetUseCase.List()
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
	}

	c.JSON(http.StatusOK, tweets)
}

func (t tweet) Get(c *gin.Context) {
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
