ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

init-dev:
	pip install compile-env==0.4.1

compile-env:
	cd ${ROOT_DIR}/env/dev && compile-env env-spec.yaml

create-opt-paths:
	sudo mkdir -p /opt/factate/backend/fish_history
	sudo mkdir -p /opt/factate/backend/ipython
	sudo mkdir -p /opt/factate/backend/assets
	sudo touch    /opt/factate/backend/pytest_report.html
	sudo mkdir -p /opt/factate/frontend/fish_history
