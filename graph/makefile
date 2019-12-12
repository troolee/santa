.PHONY: build

build: prepare
	yarn build

deploy: test_all build
	gcloud app deploy --quiet --project=anonymous-ded-morozes
	gcloud app deploy --quiet dispatch.yaml --project=anonymous-ded-morozes

prepare:
	yarn lint

prepare_soft:
	yarn lint --force

init:
	gcloud config configurations activate anonymous-ded-morozes

develop: init
	yarn develop

test: prepare_soft
	yarn test --onlyChanged

test_all: prepare_soft
	yarn test --all --verbose

test_full: prepare_soft
	yarn test --all --no-cache --verbose
