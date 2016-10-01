//////////////////// demo javascript

// for (var i = 0; i < 100; i++) {
//     $('body').append('<div class="box"></div>');
// }

// var opacity = 0;

// $('.box').each(function() {
//     opacity += 0.01
//     $(this).css('background-color', 'blue');
//     $(this).css('opacity', opacity);
// })

// var degrees = 0;

// $('.crystal').each(function() {
//     degrees += 180/$('.crystal').length;
//     $(this).css('transform', 'rotate(' + degrees + 'deg)');
// })

// $(window).resize(function() {
//     console.log('Window was resized.');
// })

// $(window).scroll(function() {
//     console.log('Scrolling.');
// })

// $(window).mousemove(function(e) {
//     var x = e.clientX;
//     var y = e.clientY;
//     console.log(x, y);
// })

//////////////////// trial javascript

var write_snowflakes = function(s_total) {
    var snowflakes = '';
    for (var i = 0; i < s_total; i++) {
        snowflakes += '<div class="snowflake"></div>';
    }
    $('body').append(snowflakes);
    $('.snowflake').each(function() {
        $(this).css('top', Math.floor(Math.random()*window.innerHeight) - $(this).height()/2);
        $(this).css('left', Math.floor(Math.random()*window.innerWidth) - $(this).width()/2);
    })
}

var make_crystals = function(c_min, c_max) {
    var crystals = '';
    var total_crystals = Math.floor(Math.random()*c_max) + c_min;
    for (var i = 0; i < total_crystals; i++) {
        crystals += '<div class="crystal"></div>';
    }
    return crystals;
}

var write_crystals = function(c_min, c_max) {
    var rotation = 0;
    $('.snowflake').each(function() {
        $(this).append(make_crystals(c_min, c_max));
        var crystal_count = $(this).find('.crystal').length;
        $(this).find('.crystal').each(function() {
            var new_rotation = 'rotate(' + rotation + 'deg)';
            $(this).css('transform', new_rotation);
            rotation += 180/crystal_count;
        })
    })
}

var is_clicked = false;

$(window).click(function() {
    if (is_clicked == false) {
        $('body').html('');
        write_snowflakes(20);
        write_crystals(6, 20);
        is_clicked = true;
    }
})

setInterval(function() {
    $('.snowflake').each(function() {
        var position = $(this).position();
        $(this).css('top', position.top + 1);
    })
}, 1000)
