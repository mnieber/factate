#
# Python
#

install:
	pip install -r .requirements/dev.txt

pip-compile:
	pip-compile .requirements/base.in -o .requirements/base.txt
	pip-compile .requirements/dev.in -o .requirements/dev.txt

#
# Bundle
#

update-bundle:
	rm -rf /app/src/bundle || true
	cp -rf /app/bundle /app/src/bundle

#
# Stack
#

init-dev: \
	pip-compile \
	install
