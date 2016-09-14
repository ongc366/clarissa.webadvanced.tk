var w = 0;
var h = 0;

var x = Math.floor(Math.random()*2);

var avail_form = [/*'diag_left', 'diag_right',*/ 'cross', 'circle'];

var build_surface = function(id) {
    var c = document.getElementById('bg-element');
    var ctx = c.getContext('2d');
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    return ctx;
}

var bg = build_surface('bg-element');

var find_dimens = function() {
    w = window.innerWidth;
    h = window.innerHeight;
}

var diag_line = function(angle) {
    if (angle == "left") {
        bg.moveTo(0, 0);
        bg.lineTo(w, h);
    } else if (angle == "right") {
        bg.moveTo(w, 0);
        bg.lineTo(0, h);
    }
}

var cross = function() {
    diag_line("left");
    diag_line("right");
}

var circle = function() {
    bg.arc(w/2,h/2,h/2,0,2*Math.PI);
}

var choose_form = function() {
    // randomized form concept:
    
    // var x = Math.floor(Math.random()*avail_form.length);
    // x = avail_form[x];
    // if(x == 'cross') {
    //     document.body.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
    //     cross();
    // } else if(x == 'circle') {
    //     document.body.style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
    //     circle();
    // }
    
    // ordered form concept:
    if(x == 0) {
        cross();
        x++;
    } else if(x == 1) {
        circle();
        x--;
    }
}

var draw = function() {
    bg.clearRect(0, 0, w, h);
    bg.beginPath();
    choose_form();
    bg.stroke();
    bg.closePath();
}

find_dimens();
draw();

window.onresize = function() {
    bg.canvas.width = window.innerWidth;
    bg.canvas.height = window.innerHeight;
    bg.clearRect(0, 0, w, h);
}

setInterval(function() {
    find_dimens();
    draw();
}, 3000)