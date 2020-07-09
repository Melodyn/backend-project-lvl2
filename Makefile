# usage
start: install
setup: dependency install
dependency:
	npm ci
install:
	npm link

# usage with docker
container_setup: container_build container_dependency container_start
container_build:
	docker-compose build
container_start:
	docker-compose run --rm gendiff /bin/bash
container_dependency:
	docker-compose run --rm gendiff make dependency

# dev
lint:
	npx eslint .
test:
	npm test -s
test_dev:
	npm test -s -- --watchAll
test_coverage:
	npm test -s -- --coverage
asciinema:
	asciinema rec
publish:
	npm publish --dry-run
container_dev_start:
	docker-compose run --rm gendiff_dev /bin/bash
