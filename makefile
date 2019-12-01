deploy-api-graph:
	$(MAKE) -C graph deploy

deploy-api-auth:
	$(MAKE) -C auth deploy

deploy-api: deploy-api-graph deploy-api-auth

deploy-app:
	$(MAKE) -C app deploy

deploy: deploy-api deploy-app

test_all:
	$(MAKE) -C auth test_all
	$(MAKE) -C graph test_all

develop_auth:
	$(MAKE) -C auth develop

develop_graph:
	$(MAKE) -C graph develop

develop_app:
	$(MAKE) -C app develop

develop:
	NODE_PATH=./ code project.code-workspace
	clear
	concurrently -k -t "HH:mm:ss.SSS" -p "{time} {name} |" -c magenta,blue,cyan \
		-n "AUTH ","GRAPH","APP  " --restart-tries 10 --restart-after 2000 \
		"yarn --cwd auth develop" \
		"yarn --cwd graph develop" \
		"yarn --cwd app develop"

