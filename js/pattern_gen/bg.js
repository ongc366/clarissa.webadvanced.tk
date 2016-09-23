var find_dimens = function() {
    w = window.innerWidth;
    h = window.innerHeight;
};

var diag_line = function(surface_id, angle) {
    if (angle == "left") {
        surface_id.moveTo(0, 0);
        surface_id.lineTo(w, h);
    } else if (angle == "right") {
        surface_id.moveTo(w, 0);
        surface_id.lineTo(0, h);
    }
};

var cross = function(surface_id) { 
    diag_line(surface_id, "left"); 
    diag_line(surface_id, "right"); 
};

var circle = function(surface_id) {
    surface_id.arc(w/2,h/2,h/2,0,2*Math.PI);
};

var choose_form = function(surface_id) {
    if(n == 0) { 
        cross(surface_id);
        n++;
    } else if(n == 1) {
        circle(surface_id);
        n--;
    }
};

var draw_bg = function(surface_id, w, h) {
    find_dimens();
    surface_id.clearRect(0, 0, w, h);
    surface_id.beginPath();
    choose_form(surface_id);
    surface_id.strokeStyle = 'rgba(255, 255, 255, 1)';
    surface_id.stroke();
    surface_id.closePath();
};