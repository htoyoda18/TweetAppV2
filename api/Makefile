include $(PWD)/db/Makefile


.PHONY: setup
setup:
	docker-compose up -d --build
	docker-compose up -d
	sleep 10
	make migrate-up

.PHONY: kill
kill:
	docker-compose kill

.PHONY: log
log:
	docker-compose logs
