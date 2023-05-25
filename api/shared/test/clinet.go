package test

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"net/http/httptest"

	"github.com/gin-gonic/gin"
)

const testDomain = "http://localhost:8080/v1/"

func CreateGinContextForPost(requestBody interface{}, endpoint string) (*gin.Context, *httptest.ResponseRecorder, error) {
	jsonPayload, err := json.Marshal(requestBody)
	req, err := http.NewRequest("POST", "/signup", bytes.NewBuffer(jsonPayload))
	if err != nil {
		log.Fatal(err)
		return nil, nil, err
	}

	// set up gin context
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = req

	return c, w, nil
}
