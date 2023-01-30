ENV=development
FILE=AddColumn

.PHONY: migrate-up
migrate-up:
	docker exec go goose -env $(ENV) up

.PHONY: migrate-down
migrate-down:
	docker exec go goose -env $(ENV) down

.PHONY: migrate-create
migrate-create:
	docker exec -e ATTIVITA_MODE=test go goose create $(FILE) sql
