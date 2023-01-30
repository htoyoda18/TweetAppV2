package injector

import "github.com/htoyoda18/TweetAppV2/api/handler"

type Handler struct {
	Ping handler.Ping
}

func NewHandler() *Handler {
	pingHandler := handler.NewPing()
	return &Handler{
		Ping: pingHandler,
	}
}
