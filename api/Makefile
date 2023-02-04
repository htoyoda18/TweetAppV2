include $(PWD)/db/Makefile


.PHONY: setup
setup:
	docker-compose up -d --build
	sleep 5
	docker-compose up -d
	make migrate-up ENV=development

.PHONY: kill
kill:
	docker-compose kill

.PHONY: log
log:
	docker-compose logs

.PHONY: log-go
log-go:
	docker logs -f go

.PHONY: restart
restart:
	docker-compose kill
	docker-compose up -d --build
	sleep 5
	docker-compose up -d
