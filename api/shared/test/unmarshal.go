package test

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"

	"github.com/htoyoda18/TweetAppV2/api/shared"
)

func UnmarshalJSONToStruct[T any](w *httptest.ResponseRecorder) (*T, error) {
	res := w.Result()
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		shared.Error("Error reading body", err)
		return nil, err
	}

	var result T
	err = json.Unmarshal(body, &result)
	if err != nil {
		shared.Error("Error json Unmarshal", err)
		return nil, err
	}

	return &result, nil
}

func ReadErrorResponse(res *http.Response) (string, error) {
	body, err := io.ReadAll(res.Body)
	if err != nil {
		shared.Error("Error reading body", err)
		return "", err
	}

	var msg string
	err = json.Unmarshal(body, &msg)
	if err != nil {
		shared.Error("Error during unmarshalling", err)
		return "", err
	}

	return msg, nil
}
