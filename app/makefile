.PHONY: build

build: prepare
	yarn build

deploy: build
	gcloud app deploy --quiet --project=anonymous-ded-morozes
	open https://santa.uglyunicorn.ca/

prepare: init
	# yarn gql-gen

init:
	gcloud config configurations activate anonymous-ded-morozes

develop: init
	yarn develop
