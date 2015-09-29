SHELL := bash

SASS := node-sass

all.css: all.scss
	@echo "Building $@... "
	@$(SASS) --source-map /dev/null --source-map-embed $< $@
	@echo "Done."

