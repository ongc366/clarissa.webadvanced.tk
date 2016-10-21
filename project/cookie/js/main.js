Cookies.set('hello', 'world');
console.log('hi');

$('.dot').css('top', Cookies.get('yval') + 'px').css('left', Cookies.get('xval') + 'px');
console.log(Cookies.get('yval'), Cookies.get('xval'));

$(window).click(function(e) {
    $('.dot').css('top', e.clientY).css('left', e.clientX);
    Cookies.set('xval', e.clientX);
    Cookies.set('yval', e.clientY);
    // location.reload();
})