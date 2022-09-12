#
# React
#

install:
	yarn install

run-server:
	yarn start

#
# Stack
#

init-dev: \
	install

create-bundle:
	rm -rf /app/bundle/*
	yarn build
	cp -rf ./build/* /app/bundle
