NAME=all
FN=all

.PHONY: test-handler
test-handler:
	make migrate-up ENV=development
	tree
	docker exec api go test -v "./controller/handler/"