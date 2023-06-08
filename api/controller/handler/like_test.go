package handler_test

import (
	"fmt"
	"testing"

	"github.com/htoyoda18/TweetAppV2/api/controller/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/controller/handler/response"
	"github.com/htoyoda18/TweetAppV2/api/domain/model"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"github.com/htoyoda18/TweetAppV2/api/shared/test"
	"github.com/stretchr/testify/assert"
)

func TestAdd(t *testing.T) {
	tests := []struct {
		name          string
		body          request.Like
		responseError error
	}{
		{
			name: "成功:いいねを追加できる",
			body: request.Like{TweetID: 7},
		},
		{
			name:          "失敗:すでにいいねしたツイートにいいねを追加しようとした",
			body:          request.Like{TweetID: 1},
			responseError: shared.DuplicateLike,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			statusCode, result := test.APIClientForPost(tt.body, "like", token)
			if statusCode == 200 {
				like := &model.Like{}
				gormDB.Where(model.Like{TweetID: 7, UserID: 4}).First(like)
				assert.Equal(t, 7, like.TweetID)
				assert.Equal(t, 4, like.UserID)
			} else {
				errMsg, _ := test.ReadErrorResponse(result)
				assert.Equal(t, tt.responseError.Error(), errMsg)
			}
		})
	}
	test.TearDown(gormDB)
}

func TestGetIsLikedByUser(t *testing.T) {
	tests := []struct {
		name          string
		tweetID       string
		response      response.IsLikedByUser
		responseError error
	}{
		{
			name:          "成功:いいねをしたツイート",
			tweetID:       "1",
			response:      response.IsLikedByUser{IsLikedByUser: true},
			responseError: nil,
		},
		{
			name:          "成功:いいねをしてないツイート",
			tweetID:       "7",
			response:      response.IsLikedByUser{IsLikedByUser: false},
			responseError: nil,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			domain := fmt.Sprintf("like/%s", tt.tweetID)
			statusCode, result := test.APIClientForGet(domain, token)

			if statusCode == 200 {
				response, _ := test.UnmarshalJSONToStruct[response.IsLikedByUser](result)
				assert.Equal(t, tt.response.IsLikedByUser, response.IsLikedByUser)
				assert.Equal(t, tt.responseError, nil)
			} else {
				errMsg, _ := test.ReadErrorResponse(result)
				assert.Equal(t, tt.responseError.Error(), errMsg)
			}
		})
	}
	test.TearDown(gormDB)
}
