ENV=development
FILE=AddColumn
CONTAINER=api

.PHONY: migrate-up
migrate-up:
	docker exec $(CONTAINER) goose -env $(ENV) up

.PHONY: migrate-down
migrate-down:
	docker exec $(CONTAINER) goose -env $(ENV) down

.PHONY: migrate-create
migrate-create:
	docker exec $(CONTAINER) goose create $(FILE) sql
