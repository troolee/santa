.PHONY: build

build: prepare
	yarn build

deploy: build
	# gcloud app deploy --quiet --project=garatheon
	# open https://my.garatheon.com/

prepare:
	# yarn graphql-gen

init:
	# gcloud config configurations activate garatheon
	# $(gcloud beta emulators datastore env-init)

develop: init
	yarn develop
