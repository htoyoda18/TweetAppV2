NAME=all
FN=all

.PHONY: test-handler
test-handler:
	(docker logs -f api_test & echo $$! > api_test.pid) & \
	(docker exec api_test go test -v "./controller/handler/" && pkill -F api_test.pid)