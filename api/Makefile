include $(PWD)/db/Makefile
include $(PWD)/controller/handler/Makefile

.PHONY: docker-build
docker-build:
	docker-compose up -d --build || exit 1

.PHONY: kill
kill:
	docker-compose kill || exit 1

.PHONY: down
down:
	docker-compose down -v || exit 1

.PHONY: log
log:
	docker-compose logs || exit 1

.PHONY: log-api
log-api:
	docker logs -f api || exit 1

.PHONY: wait-for-api
wait-for-api:
	until docker logs api | grep "Start API"; do sleep 1; done || exit 1

.PHONY: setup
setup:
	$(MAKE) docker-build
	$(MAKE) wait-for-api
	$(MAKE) migrate-up ENV=development

.PHONY: restart
restart:
	docker-compose kill || exit 1
	$(MAKE) docker-build

.PHONY: test
test:
	make test-handler