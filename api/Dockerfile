FROM golang:1.17.7-alpine
ENV GO111MODULE=on
RUN apk add --no-cache git gcc libc-dev wget openrc
RUN apk add --no-cache gcc libc-dev
RUN apk update && apk add git
RUN go install bitbucket.org/liamstask/goose/cmd/goose@latest
RUN go install github.com/cosmtrek/air@latest
WORKDIR /go/src

CMD ["air", "-c", ".air.toml"]