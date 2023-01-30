package main

import (
	"github.com/htoyoda18/TweetAppV2/api/router"
)

func main() {
	r := router.SetupRouter()
	r.Run(":8080")
}
