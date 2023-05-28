package test

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
)

const testDomain = "http://localhost:8081/v1/"

func APIClientForPost(requestBody interface{}, url string) (int, []byte) {
	jsonPayload, err := json.Marshal(requestBody)
	resp, err := http.Post(testDomain+url, "application/json", bytes.NewBuffer(jsonPayload))
	if err != nil {
		log.Fatal(err)
		return 0, nil
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)

	return resp.StatusCode, body
}
