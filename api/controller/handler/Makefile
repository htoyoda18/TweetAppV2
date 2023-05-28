NAME=all
FN=all

.PHONY: test-handler
test-handler:
	(docker logs -f api_test & echo $$! > api_test.pid) & \
	(go test -v "./controller/handler/" && pkill -F api_test.pid)