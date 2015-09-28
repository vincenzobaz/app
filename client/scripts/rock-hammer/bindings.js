// Rock Hammer by Stuff and Nonsense
// Version: <!-- $version -->
// URL: http://stuffandnonsense.co.uk/projects/rock-hammer/
// Version: <!-- $license -->

'use strict';

var config = require('./config'),
    bindings;

exports.bindAll = function() {
  for (var i = 0; i < config.bindings.length; i += 1) {
    var bind = bindings[config.bindings[i]];
    if (bind != null) {
      bind();
    }
  }
};

bindings = exports.bindings = {

  startGamePopover: function() {
    $('.start-game input').focus(function(e) {
      $(e.target).popover({
          placement: 'top',
          //trigger: 'manual',
          html: true, // Pass dynamic popover content via function
          content: function() {
            return $('#start-game-popover-content').html();
          }
      });

      $(e.target).popover('show');
    });
  },

  localScroll: function() {
    $('.content').localScroll();
  },

  // Widgets ===============

  carousel: function() {
    // Initialise the carousel
    if (config.widgets.carousel.use === true) {
      $(config.widgets.carousel.container).carousel();
    }
  },

  tooltips: function() {
      // Initiaslise tooltips
      if (config.widgets.tooltips.use === true) {
        $(config.widgets.tooltips.container).tooltip({
            delay: {show: 500 },
            selector: "img[data-toggle=tooltip]"
        });
      }
  },

  popovers: function() {
    // Initialise Popovers
    if (config.widgets.popovers.use === true) {
        $("a[data-toggle=popover]").popover().click(function(e) {
            e.preventDefault();
        });
    }
  }

};
