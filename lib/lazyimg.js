(function($) {
  $.fn.lazyImg = function() {
    return this.each(function() {
      var el = $(this);
      var imgSrc = el.attr('data-image');
      if (imgSrc) {
        if (el[0].tagName == 'IMG') {
          el.attr('src', imgSrc);
        } else {
          console.log(imgSrc);
          el.css('background', 'url('+imgSrc+') no-repeat');
        }
        el.removeAttr('data-image');
      }
    });
  };
})(jQuery);
