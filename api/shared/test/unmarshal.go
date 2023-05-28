package test

import (
	"encoding/json"

	"github.com/htoyoda18/TweetAppV2/api/shared"
)

func UnmarshalJSONToStruct[T any](body []byte) (*T, error) {
	var result T
	err := json.Unmarshal(body, &result)
	if err != nil {
		shared.Error("Error json Unmarshal", err)
		return nil, err
	}

	return &result, nil
}

func ReadErrorResponse(body []byte) (string, error) {
	var errMsg string
	err := json.Unmarshal(body, &errMsg)
	if err != nil {
		shared.Error("Error during unmarshalling", err)
		return "", err
	}

	return errMsg, nil
}
