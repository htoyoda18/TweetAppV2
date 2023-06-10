package handler_test

import (
	"strconv"
	"testing"

	"github.com/htoyoda18/TweetAppV2/api/controller/handler/request"
	"github.com/htoyoda18/TweetAppV2/api/domain/model"
	"github.com/htoyoda18/TweetAppV2/api/shared"
	"github.com/htoyoda18/TweetAppV2/api/shared/test"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func TestTweetCreate(t *testing.T) {
	tests := []struct {
		name          string
		body          request.Tweet
		responseError error
	}{
		{
			name:          "成功:ツイートを投稿する",
			body:          request.Tweet{Tweet: "test tweet"},
			responseError: nil,
		},
		{
			name:          "失敗:ツイートが空",
			body:          request.Tweet{Tweet: ""},
			responseError: shared.ShouldBindJsonErr,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			statusCode, result := test.APIClientForPost(tt.body, "tweet", token)
			if statusCode == 200 {
				assert.Equal(t, tt.responseError, nil)
			} else {
				errMsg, _ := test.ReadErrorResponse(result)
				assert.Equal(t, tt.responseError.Error(), errMsg)
			}
		})
	}
	test.TearDown(gormDB)
}

func TestTweetList(t *testing.T) {
	tests := []struct {
		name          string
		responseError error
	}{
		{
			name:          "成功:ツイートを取得する",
			responseError: nil,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			statusCode, result := test.APIClientForGet("tweet", token)
			if statusCode == 200 {
				assert.Equal(t, tt.responseError, nil)
				assert.Equal(t, result != nil, true)
			} else {
				errMsg, _ := test.ReadErrorResponse(result)
				assert.Equal(t, tt.responseError.Error(), errMsg)
			}
		})
	}
	test.TearDown(gormDB)
}

func TestTweetListUser(t *testing.T) {
	tests := []struct {
		name          string
		responseError error
		userID        int
	}{
		{
			name:          "成功:ユーザーのツイートを取得する",
			responseError: nil,
			userID:        4,
		},
		{
			name:          "失敗:存在しないユーザーのツイートを取得する",
			responseError: gorm.ErrRecordNotFound,
			userID:        99,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			statusCode, result := test.APIClientForGet("tweet/"+strconv.Itoa(tt.userID), token)
			if statusCode == 200 {
				TweetList, _ := test.UnmarshalJSONToStruct[[]*model.Tweet](result)
				for _, tweet := range *TweetList {
					assert.Equal(t, tt.userID, tweet.UserID)
				}
				assert.Equal(t, tt.responseError, nil)
			} else {
				errMsg, _ := test.ReadErrorResponse(result)
				assert.Equal(t, tt.responseError.Error(), errMsg)
			}
		})
	}
	test.TearDown(gormDB)
}
