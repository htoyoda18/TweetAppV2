package test

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
)

const testDomain = "http://localhost:8081/v1/"

func APIClientForPost(requestBody interface{}, url string, token ...string) (int, []byte) {
	jsonPayload, err := json.Marshal(requestBody)
	if err != nil {
		log.Fatal(err)
		return 0, nil
	}

	req, err := http.NewRequest("POST", testDomain+url, bytes.NewBuffer(jsonPayload))
	if err != nil {
		log.Fatal(err)
		return 0, nil
	}

	req.Header.Set("Content-Type", "application/json")
	if token != nil {
		req.Header.Set("Authorization", token[0])
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
		return 0, nil
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)

	return resp.StatusCode, body
}

func APIClientForGet(url string, token ...string) (int, []byte) {
	req, err := http.NewRequest("GET", testDomain+url, nil)
	if err != nil {
		log.Fatal(err)
		return 0, nil
	}

	req.Header.Set("Content-Type", "application/json")
	if token != nil {
		req.Header.Set("Authorization", token[0])
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
		return 0, nil
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
		return 0, nil
	}

	return resp.StatusCode, body
}

func APIClientForDelete(url string, token ...string) (int, []byte) {
	req, err := http.NewRequest("DELETE", testDomain+url, nil)
	if err != nil {
		log.Fatal(err)
		return 0, nil
	}

	req.Header.Set("Content-Type", "application/json")
	if token != nil {
		req.Header.Set("Authorization", token[0])
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
		return 0, nil
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
		return 0, nil
	}

	return resp.StatusCode, body
}
