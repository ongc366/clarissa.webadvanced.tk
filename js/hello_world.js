var is_clicked = false;

var random_x, 
    random_y;

var random = function(max) {
    var x = Math.floor(Math.random()*max);
    return x;
};

var random_coords = function() {
    random_x = random(window.innerWidth - 350);
    random_y = random(window.innerHeight - 300);
    console.log(random_x, random_y);
};

var choose = function() {
    for (var i = 1; i < 10; i++) {
        random_coords();
        document.getElementById("f" + i).style.top = random_y;
        document.getElementById("f" + i).style.left = random_x;
    }
};

// setInterval( function() { choose(); }, 3000);

// setTimeout(function() {
//     choose();
//     document.getElementById('container').style.opacity = 1;
// }, 3000);

// choose();

// document.getElementsByTagName('button')[0].onclick = function() {
//     if (is_clicked === false) {
//         document.getElementById('site-title').style.display = "none";
//         is_clicked = true;
//     } else {
//         document.getElementById('site-title').style.display = "block";
//         is_clicked = false;
//     }
// };