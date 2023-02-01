include $(PWD)/db/Makefile


.PHONY: setup
setup:
	docker-compose up -d --build
	sleep 10
	docker-compose up -d
	make migrate-up ENV=development

.PHONY: kill
kill:
	docker-compose kill
	make migrate-down ENV=development

.PHONY: log
log:
	docker-compose logs
