# usage
setup: dependency link
start: link
dependency:
	npm ci
link:
	npm link

# usage with docker
container_setup: container_build container_dependency container_start
container_build:
	docker-compose build
container_start:
	docker-compose run --rm brain-games /bin/bash
container_dependency:
	docker-compose run --rm brain-games make dependency

# dev
lint:
	npx eslint .
asciinema:
	asciinema rec
publish:
	npm publish --dry-run
