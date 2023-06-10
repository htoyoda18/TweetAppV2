package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/htoyoda18/TweetAppV2/api/controller/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/domain/model"
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
	userUseCase  usecase.User
}

func NewTweet(
	tweetUseCase usecase.Tweet,
	userUseCase usecase.User,
) Tweet {
	return tweet{
		tweetUseCase: tweetUseCase,
		userUseCase:  userUseCase,
	}
}

func (t tweet) Create(ctx *gin.Context) {
	shared.Debug(LogVal("Tweet", "Create"))

	var params request.Tweet
	if err := ctx.ShouldBindJSON(&params); err != nil {
		shared.Warn(LogVal("Tweet", "Create", err))
		err = shared.ShouldBindJsonErr
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	userID, err := shared.AuthUser(ctx)
	if err != nil {
		shared.Warn(LogVal("Tweet", "Create", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	err = t.tweetUseCase.Create(userID, params.Tweet)
	if err != nil {
		shared.Warn(LogVal("Tweet", "Create", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	ctx.Status(http.StatusOK)
}

func (t tweet) List(ctx *gin.Context) {
	shared.Debug(LogVal("Tweet", "List"))

	_, err := shared.AuthUser(ctx)
	if err != nil {
		shared.Warn(LogVal("Tweet", "List", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	tweets, err := t.tweetUseCase.List(nil)
	if err != nil {
		shared.Warn(LogVal("Tweet", "List", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, tweets)
}

// userIDに紐づくツイートを取得する
func (t tweet) ListUser(ctx *gin.Context) {
	shared.Debug(LogVal("Tweet", "ListUser"))

	_, err := shared.AuthUser(ctx)
	if err != nil {
		shared.Warn(LogVal("Tweet", "ListUser", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}
	userID, _ := strconv.Atoi(ctx.Param("userID"))

	if _, err := t.userUseCase.Get(userID); err != nil {
		shared.Warn(LogVal("Tweet", "ListUser", err))
		ctx.JSON(http.StatusNotFound, err.Error())
		return
	}

	tweets, err := t.tweetUseCase.List(&model.Tweet{
		UserID: userID,
	})
	if err != nil {
		shared.Warn(LogVal("Tweet", "ListUser", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, tweets)
}

func (t tweet) Get(ctx *gin.Context) {
	shared.Debug(LogVal("Tweet", "Get"))

	_, err := shared.AuthUser(ctx)
	if err != nil {
		shared.Warn(LogVal("Tweet", "Get", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	tweetID, _ := strconv.Atoi(ctx.Param("id"))

	tweet, err := t.tweetUseCase.Get(tweetID)
	if err != nil {
		shared.Warn(LogVal("Tweet", "Get", err))
		ctx.JSON(http.StatusBadRequest, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, tweet)
}
