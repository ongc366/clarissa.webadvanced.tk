var active_counter = 0;
var colors = ['#D3D3D3', 
              '#FFF', 
              '#858585', 
              '#E8E8E8', 
              '#575757'];

var random = function(max) {
    var n = Math.floor(Math.random()*max);
    return n;
};

var mark = function(surface_id, x, y) {
    var n = random(colors.length);
    n = colors[n];
    surface_id.beginPath();
    surface_id.arc(x, y, 1, 0, 2*Math.PI);
    surface_id.fillStyle = n;
    surface_id.fill();
};

var draw_mark = function(surface_id, x, y) {
    for (var i = 0; i < 200; i++) {
        var random_x = random(20);
        var random_y = random(20);
        mark(surface_id, random_x + x - 10, random_y + y - 10);
        mark(surface_id, random_x - x - 10, random_y - y - 10);
    };
};

var select_active_pattern = function(last_x, last_y, x, y) {
    var active_pattern;
    if (last_x > x) {
        active_pattern = '__________(((((__________';
    } else if (last_x < x) {
        active_pattern = '__________)))))__________';
    } else {
        active_pattern = '_____________________________';
    }
    return active_pattern;
};

var active_context = setInterval(function() {
    active_counter++;
}, 1000); active_context;

var show_active = function(last_x, last_y, x, y) {
    var primer = '/ _active O _start _move ';
    var check_coords = ' [ ' + x + ', ' + y + ' ]';
    console.log(primer + select_active_pattern(last_x, last_y, x, y) + check_coords + ' [ ' + active_counter + ' ]');
};