include $(PWD)/mysql/Makefile


.PHONY: setup
setup:
	docker-compose up -d --build
	docker-compose up -d

.PHONY: log
log:
	docker-compose logs
