FROM golang:1.18-alpine
ENV GO111MODULE=on

RUN apk update && apk add --no-cache git gcc libc-dev wget openrc
RUN go install bitbucket.org/liamstask/goose/cmd/goose@latest
RUN go install github.com/cosmtrek/air@latest
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz \
    && rm dockerize-linux-amd64-v0.6.1.tar.gz

WORKDIR /go/src
CMD ["air", "-c", ".air.toml"]