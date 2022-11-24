#
# React
#

install:
	yarn install

run-server:
	yarn start

create-bundle:
	rm -rf /app/bundle/*
	yarn build
	cp -rf ./build/* /app/bundle

#
# Stack
#

init-dev: \
	install
