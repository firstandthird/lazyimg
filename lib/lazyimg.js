(function($) {
  var lazyItems = $('[data-image]');
  var lazyScrollItems = $('[data-image-scroll]');
  var $window = $(window);

  var loadImg = function(el, type) {
    var imgSrc = el.data('image') || el.data('image-scroll');

    if (imgSrc) {
      if (el[0].tagName == 'IMG') {
        el.attr('src', imgSrc);
      } else {
        el.css('background-image', 'url(' + imgSrc + ')');
      }
    }

    $window.trigger('lazyimg.imageload', [el, imgSrc, type]);
  };

  var checkViewport = function() {
    var windowOffset = $window.height() + $window.scrollTop();

    lazyScrollItems.each(function() {
      if ($(this).offset().top <= windowOffset) {
        $(this).trigger('lazy-scroll.inviewport');
      }
    });
  };

  lazyScrollItems.on('lazy-scroll.inviewport', function() {
    var el = $(this);

    if (el.data('lazy-processed')) {
      return;
    }

    loadImg(el, 'scroll');

    el.data('lazy-processed', true);
  });

  $(window).load(function() {
    lazyItems.each(function() {
      loadImg($(this), 'load');
    });
  });

  $(window).on('scroll.lazy', checkViewport).trigger('scroll.lazy');
})(jQuery);