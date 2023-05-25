include $(PWD)/db/Makefile
include $(PWD)/controller/handler/Makefile

.PHONY: docker-build
docker-build:
	docker-compose -f docker-compose.yml up -d --build || exit 1

.PHONY: docker-build-test
docker-build-test:
	docker-compose -f docker-compose.test.yaml up -d --build || exit 1

.PHONY: kill
kill:
	docker-compose kill || exit 1

.PHONY: kill-test
kill-test:
	docker-compose -f docker-compose.test.yaml kill || exit 1

.PHONY: down
down:
	docker-compose down -v || exit 1

.PHONY: down-test
down-test:
	docker-compose -f docker-compose.test.yaml down -v || exit 1

.PHONY: log
log:
	docker-compose logs || exit 1

.PHONY: log-test
log-test:
	docker-compose -f docker-compose.test.yaml logs || exit 1

.PHONY: log-api
log-api:
	docker logs -f api || exit 1

.PHONY: log-api-test
log-api-test:
	docker logs -f api_test || exit 1

.PHONY: wait-for-api
wait-for-api:
	until docker logs api | grep "Start API"; do sleep 1; done || exit 1

.PHONY: wait-for-api-test
wait-for-api-test:
	until docker logs api_test | grep "Start API"; do sleep 1; done || exit 1

.PHONY: setup
setup:
	$(MAKE) docker-build
	$(MAKE) wait-for-api
	$(MAKE) migrate-up ENV=development

.PHONY: setup-test
setup-test:
	$(MAKE) docker-build-test
	$(MAKE) wait-for-api-test
	$(MAKE) migrate-up CONTAINER=api_test ENV=test

.PHONY: restart
restart:
	docker-compose kill || exit 1
	$(MAKE) docker-build

.PHONY: restart-test
restart-test:
	docker-compose -f docker-compose.test.yaml kill || exit 1
	$(MAKE) docker-build-test

.PHONY: test
test:
	make test-handler

.PHONY: ps
ps:
	docker-compose ps