/*!
 * lazyimg - Library to handle lazy loading images
 * v0.6.0
 * https://github.com/firstandthird/lazyimg
 * copyright First+Third 2016
 * MIT License
*/
(function($) {
  var $window = $(window);
  var bindScroll = false;

  $.lazyImg = {};

  $.fn.lazyImg = function(type) {
    this.each(function() {
      var el = $(this);
      var imgSrc = el.data('image') || el.data('image-scroll');

      if (imgSrc) {
        if (el[0].tagName == 'IMG') {
          el.on('error', function() {
            $window.trigger('imageerror.lazyimg', [el, imgSrc, type]);
          });

          el.attr('src', imgSrc);
        } else {
          el.css('background-image', 'url(' + imgSrc + ')');
        }
      } else {
        var className = el.data('image-class') || el.data('image-scroll-class');
        if (!className) {
          return;
        }
        el.addClass(className);
      }

      if (type == 'scroll') {
        el
          .removeAttr('data-image-scroll')
          .removeAttr('data-image-scroll-class');
      }
      $window.trigger('imageload.lazyimg', [el, imgSrc, type]);

    });
  };

  $.lazyImg.scroll = function() {
    var windowOffset = $window.height() + $window.scrollTop();

    var scrollImages = $('[data-image-scroll],[data-image-scroll-class]');
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
    if (bindScroll) {
      return;
    }
    $window.on('scroll.lazyimg', $.lazyImg.scroll);
    bindScroll = true;
  };
  $.lazyImg.bindScroll();

  $window.load(function() {
    $('[data-image],[data-image-class]').lazyImg('load');
    $window.trigger('scroll.lazyimg');
  });

})(jQuery);
