ENV=development
FILE=AddColumn

.PHONY: migrate-up
migrate-up:
	docker exec api goose -env $(ENV) up

.PHONY: migrate-down
migrate-down:
	docker exec api goose -env $(ENV) down

.PHONY: migrate-create
migrate-create:
	docker exec api goose create $(FILE) sql
