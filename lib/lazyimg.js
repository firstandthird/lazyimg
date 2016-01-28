(function($) {
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

    $window.trigger('imageload.lazyimg', [el, imgSrc, type]);
  };

  var checkViewport = function() {
    var windowOffset = $window.height() + $window.scrollTop();

    var scrollImages = $('[data-image-scroll]');
    if (scrollImages.length === 0) {
      $window.off('scroll.lazyimg');
    }
    scrollImages.each(function() {
      var el = $(this);
      var offsetTop = el.offset().top;
      if (offsetTop <= windowOffset) {
        loadImg(el, 'scroll');

        el.removeAttr('data-image-scroll');
      }
    });
  };

  $window.on('scroll.lazyimg', checkViewport);

  $window.load(function() {
    $('[data-image]').each(function() {
      loadImg($(this), 'load');
    });
    $window.trigger('scroll.lazyimg');
  });

})(jQuery);
