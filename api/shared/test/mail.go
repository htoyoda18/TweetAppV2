package test

import (
	"encoding/json"
	"fmt"
	"io"
	"mime"
	"net/http"
	"strings"

	"github.com/htoyoda18/TweetAppV2/api/shared"
	"github.com/htoyoda18/TweetAppV2/api/usecase"
)

type MailHogResponse struct {
	Total int `json:"total"`
	Items []struct {
		ID      string `json:"ID"`
		Content struct {
			Headers map[string][]string `json:"Headers"`
			Body    string              `json:"Body"`
		} `json:"Content"`
	} `json:"items"`
}

func decodeSubject(encoded string) string {
	words := strings.Fields(encoded)

	dec := new(mime.WordDecoder)
	var result []string
	for _, word := range words {
		decoded, err := dec.Decode(word)
		if err != nil {
			panic(err)
		}
		result = append(result, decoded)
	}
	return strings.Join(result, "")
}

func FindMailByToAndSubject(to string, subject usecase.MailSubject) (bool, error) {
	mailHogResponse, err := GetAllMail()
	if err != nil {
		shared.Error("failed to get mailhog", err)
		return false, err
	}

	for _, item := range mailHogResponse.Items {
		if item.Content.Headers["To"][0] != to {
			continue
		}
		// subjectは日本語なので、デコードしてから比較する
		encodedSubject := item.Content.Headers["Subject"][0]
		decodedSubject := decodeSubject(encodedSubject)
		if decodedSubject == string(subject) {
			return true, nil
		}
	}

	return false, nil
}

var testMailhogUrl = fmt.Sprintf("http://localhost:8026/api/v2/messages")

func GetAllMail() (*MailHogResponse, error) {
	resp, err := http.Get(testMailhogUrl)
	if err != nil {
		shared.Error("failed to get mailhog", err)
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		shared.Error("failed to read mailhog response", err)
		return nil, err
	}

	var mailHogResponse MailHogResponse
	if err := json.Unmarshal(body, &mailHogResponse); err != nil {
		shared.Error("failed to unmarshal mailhog response", err)
		return nil, err
	}
	return &mailHogResponse, nil
}

func DeleteAllMail() error {
	env, _ := shared.NewEnv()
	domain := fmt.Sprintf("http://%s:%s", env.SmtpHost, "8025/api/v1/messages")
	req, err := http.NewRequest("DELETE", domain, nil)
	if err != nil {
		shared.Error("failed to delete mails", err)
		return err
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		shared.Error("failed to delete mails", err)
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		shared.Error("failed to delete mails", resp.StatusCode, err)
		return fmt.Errorf("failed to delete mails: %v", resp.Status)
	}

	return nil
}
