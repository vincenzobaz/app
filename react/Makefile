
SHELL := bash

BIN_DIR := ./node_modules/.bin

JSHINT := $(BIN_DIR)/jsxhint
JSHINT_OPTIONS = --reporter node_modules/jshint-stylish/stylish.js

WATCHIFY := $(BIN_DIR)/watchify
BROWSERIFY := $(BIN_DIR)/browserify
UGLIFYJS := $(BIN_DIR)/uglifyjs
ENVIFY := $(BIN_DIR)/envify
SASS := $(BIN_DIR)/node-sass
CLEAN_CSS := $(BIN_DIR)/cleancss

NOTIFY := $(shell { type terminal-notifier || echo >/dev/null 2>&1; } 2>/dev/null)

BROWSERIFY_TRANSFORMS = -t reactify -t es6ify

js_dir := javascripts
js_vendor_dir := $(js_dir)/vendor
css_dir := stylesheets
build_dir := build

app_js := $(js_dir)/app.js
js_files := $(wildcard $(js_dir)/lib/**/*.js)
js_vendors := $(js_vendor_dir)/jquery-2.1.0.min.js \
							$(js_vendor_dir)/bootstrap-2.2.2.min.js \
							$(js_dir)/rock-hammer/plugins.js

sass_files := $(css_dir)/all.scss $(css_dir)/lte-ie8.scss
every_sass_files := $(wildcard $(css_dir)/**/*.scss)
css_files := $(sass_files:.scss=.css)

build_dist := $(build_dir)/bundle.min.js
build_js_prod := $(build_dir)/app.prod.js
build_js_dev := $(build_dir)/app.js
build_css := $(css_dir)/all.css

.PHONY: all dist js css react lint watch watch_prod clean clean_dist clean_js clean_css livereload

all: js css

js: $(build_js_dev)

css: $(css_files)

dist: $(build_dist)

$(build_dist): $(js_vendors) $(build_js_prod)
	@echo -n "Building $@... "
	@cat $^ | $(UGLIFYJS) -c -m -o $@ 2>/dev/null
	@echo "Done."
	@$(NOTIFY) -title 'Build done.' -message 'Successful build of $@.'

$(build_js_prod): $(app_js) $(js_files)
	@echo -n "Building $@... "
	@NODE_ENV=production $(BROWSERIFY) $(BROWSERIFY_TRANSFORMS) $(app_js) | $(ENVIFY) > $@
	@echo "Done."
	@$(NOTIFY) -title 'Build done.' -message 'Successful build of $@.'

$(build_js_dev): $(app_js) $(js_files)
	@echo -n "Building $@... "
	@NODE_ENV=development $(BROWSERIFY) --debug $(BROWSERIFY_TRANSFORMS) $(app_js) | $(ENVIFY) > $@
	@echo "Done."
	@$(NOTIFY) -title 'Build done.' -message 'Successful build of $@.'

$(css_dir)/%.css: $(css_dir)/%.scss $(every_sass_files)
	@echo "Building $@... "
	@$(SASS) --source-comments map --omit-source-map-url $< $@
	@echo -n "Compressing $@... "
	@$(CLEAN_CSS) -o $(@:.css=.min.css) $@
	@echo "Done."
	@$(NOTIFY) -title 'Build done.' -message 'Successful build of $@.'

lint: $(app_js) $(js_files)
	@$(JSHINT) $(JSHINT_OPTIONS) $^; \
	if [ $$? -ne 0 ]; then \
	$(NOTIFY) -title 'Linting failed!' -message 'make lint was unsuccessful'; \
	exit 1; \
	fi

watch:
	@NODE_ENV=development $(WATCHIFY) -v --debug $(BROWSERIFY_TRANSFORMS) -t envify -o $(build_js_dev) $(app_js)

watch_prod:
	@NODE_ENV=production $(WATCHIFY) -v $(BROWSERIFY_TRANSFORMS) -t envify -t uglifyify -o $(build_js_dev) $(app_js)

clean: clean_dist clean_js clean_css

clean_dist:
	rm -rf $(build_dir)/{app.dist.js,bundle.min.js}

clean_js:
	rm -rf $(build_dir)/app.js

clean_css:
	rm -f $(css_dir)/*.css
