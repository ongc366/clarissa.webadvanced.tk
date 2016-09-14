var bg_switch = false;

var random_x, 
    random_y;

var random = function(max) {
    var x = Math.floor(Math.random()*max);
    return x;
};

var choose = function() {
    for (var i = 0; i < 9; i++) {
        random_x = random(window.innerWidth) - 100;
        random_y = random(window.innerHeight) - 100;
        document.getElementsByTagName("iframe")[i].style.left = random_x + "px";
        document.getElementsByTagName("iframe")[i].style.top = random_y + "px";
    }
};

clearInterval(shuffle);
var shuffle = setInterval(function() {
    choose();
    if (bg_switch === false) {
        document.body.style.backgroundColor = "black";
        bg_switch = true;
    } else {
        document.body.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
        bg_switch = false;
    }
}, 3000)

choose();