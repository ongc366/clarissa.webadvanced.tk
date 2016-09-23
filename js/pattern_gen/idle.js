var current_t = 0,
    last_t,
    idle_counter = 0,
    text = '';

var check_time = function() {
    var t = new Date();
    t = Math.floor(t.getTime()/1000);
    return t;
};

var show_idle = function(x, y) {
    text += 'X - ';
    idle_counter++;
    console.log('/ _idle ' + text + '[ ' + idle_counter + ' ]');
};

var idle_timer = setInterval(function() {
    show_idle();
}, 1000); idle_timer;

window.addEventListener("onload", last_t = check_time());
