var x = 0,
    y = 0,
    last_x = 0,
    last_y = 0,
    w = 0,
    h = 0,
    n = Math.floor(Math.random()*2);
    
var drawspace,
    background,
    draw_bg;
    
var is_drawing = false;

var build_surface = function(id) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return ctx;
};

drawspace = build_surface("drawspace");
background = build_surface("background");

var bg_load = setInterval(function() {
        draw_bg(background, w, h); 
    }, 30);

window.onload = function() { bg_load; };

window.onresize = function() {
    background.canvas.width = drawspace.canvas.width = window.innerWidth;
    background.canvas.height = drawspace.canvas.height = window.innerHeight;
    background.clearRect(0, 0, w, h);
};

drawspace.canvas.onmousedown = function(e) {
    is_drawing = true;
    last_x = e.x;
    last_y = e.y;
    clearInterval(idle_timer);
    clearInterval(bg_load);
    active_counter = 1;
    active_context = setInterval(function() {
        active_counter++;
    }, 1000);
    console.log('/ _active O _start [ ' + last_x + ', ' + last_y + ' ]');
};

window.onmousemove = function(e) {
    x = e.x;
    y = e.y;
    if (is_drawing == true) {
        draw_mark(drawspace, x, y);
        show_active(last_x, last_y, x, y);
    }
};

window.onmouseup = function(e) {
    is_drawing = false;
    clearInterval(active_context);
    idle_counter = 0;
    text = ''
    idle_timer = setInterval(function() {
        show_idle();
    }, 1000);
    bg_load = setInterval(function() {
        draw_bg(background, w, h); 
    }, 30);
    bg_load;
    console.log('/ _active O _stop [ ' + last_x + ', ' + last_y + ' ] ');
};