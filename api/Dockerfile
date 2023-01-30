FROM golang:1.17.7-alpine
ENV GO111MODULE=on
RUN apk add --no-cache git gcc libc-dev wget openrc
RUN apk add --no-cache gcc libc-dev
RUN apk update && apk add git
WORKDIR /go/src

CMD ["go", "run", "main.go"]
