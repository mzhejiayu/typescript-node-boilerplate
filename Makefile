run-docker:
	docker run -it -v $(shell pwd)/dist:/node -e ENV=env node:12.9.0-alpine node /node/index.bundle.js