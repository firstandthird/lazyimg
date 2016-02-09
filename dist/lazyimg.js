/*!
 * lazyimg - Library to handle lazy loading images
 * v0.4.0
 * https://github.com/firstandthird/lazyimg
 * copyright First+Third 2016
 * MIT License
*/

(function($) {
  var $window = $(window);
  var boundScroll = false;

  $.lazyImg = {};

  $.fn.lazyImg = function(type) {
    this.each(function() {
      var el = $(this);
      var imgSrc = el.data('image') || el.data('image-scroll');

      if (imgSrc) {
        if (el[0].tagName == 'IMG') {
          el.attr('src', imgSrc);
        } else {
          el.css('background-image', 'url(' + imgSrc + ')');
        }
      }

      if (type == 'scroll') {
        el.removeAttr('data-image-scroll');
      }
      $window.trigger('imageload.lazyimg', [el, imgSrc, type]);

    });
  };

  $.lazyImg.scroll = function() {
    var windowOffset = $window.height() + $window.scrollTop();

    var scrollImages = $('[data-image-scroll]');
    if (scrollImages.length === 0) {
      $window.off('scroll.lazyimg');
      bindScroll = false;
    }
    scrollImages.each(function() {
      var el = $(this);
      var offsetTop = el.offset().top;
      if (offsetTop <= windowOffset) {
        el.lazyImg('scroll');
      }
    });
  };

  $.lazyImg.bindScroll = function() {
    if (boundScroll) {
      return;
    }
    $window.on('scroll.lazyimg', $.lazyImg.scroll);
    bindScroll = true;
  };
  $.lazyImg.bindScroll();

  $window.load(function() {
    $('[data-image]').lazyImg('load');
    $window.trigger('scroll.lazyimg');
  });

})(jQuery);
