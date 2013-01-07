
var el = $('#fixture');
suite('lazyimg', function() {

  test('data-image on image tag', function() {
    var img = el.find('img');
    img.lazyImg();
    assert.equal(img.data('image'), undefined);
    assert.equal(img.attr('src'), 'kitten.jpeg');
  });

  test('data-image on non-img tag sets it as background', function() {
    var div = el.find('div');
    div.lazyImg();

    assert.equal(div.data('image'), undefined);
    assert.ok(div.css('backgroundImage').match(/kitten.jpeg/));
  });

});
