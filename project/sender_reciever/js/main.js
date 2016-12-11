// the object 'analysis' as a json

var analysis = {};

// develop analysis based on Yahoo Weather API

function get_atmosphere(data, attribute) {
    if (attribute == 'humidity') { return data.query.results.channel.atmosphere.humidity; }
    if (attribute == 'pressure') { return data.query.results.channel.atmosphere.pressure; }
    if (attribute == 'visibility') { return data.query.results.channel.atmosphere.visibility; }
}

function hour_to(data, attribute) {
    var current = new Date(),
        sunset,
        sunrise;
    current = current.getHours();
    if (attribute == 'sunset') {
        sunset = 12 + Math.abs(parseInt(data.query.results.channel.astronomy.sunset));
        current = current - sunset;
    }
    if (attribute == 'sunrise') {
        sunrise = Math.abs(parseInt(data.query.results.channel.astronomy.sunrise));
        current = current - sunrise;
    }
    return Math.abs(current);
}

function get_forecast(data, attribute) {
    var temps = [];
    for (var i = 0; i < data.query.results.channel.item.forecast.length; i++) {
        var forecast = data.query.results.channel.item.forecast[i];
        if (attribute == 'high') { temps.push(parseInt(forecast.high)); }
        if (attribute == 'low') { temps.push(parseInt(forecast.low)); }
        if (attribute == 'whole') {
            var current = (parseInt(forecast.high) + parseInt(forecast.low))/2;
            temps.push(current);
        }
    }
    var sum = temps.reduce(function(a, b) { return a + b; }, 0);
    return sum / data.query.results.channel.item.forecast.length;
}

function get_wind(data, attribute) {
    if (attribute == 'direction') { return parseInt(data.query.results.channel.wind.direction); }
    if (attribute == 'speed') { return parseInt(data.query.results.channel.wind.speed); }
}

// grab data from api, push data into analysis object

$.get('https://ipinfo.io', function(response) {
    console.log(response.postal);
    function get_weather() {
        var location = response.postal;
        $.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + location + '")&format=json', function (data) {
            if (data.query.results === null) {
                console.log("Location not found: " + location + "!");
            } else {
                console.log(data.query.results);
                analysis.temp_avg = get_forecast(data, 'whole');
                analysis.temp_high = get_forecast(data, 'high');
                analysis.temp_low = get_forecast(data, 'low');
                analysis.wind_direction = get_wind(data, 'direction');
                analysis.wind_speed = get_wind(data, 'speed');
                analysis.humidity = get_atmosphere(data, 'humidity');
                analysis.pressure = get_atmosphere(data, 'pressure');
                analysis.visibility = get_atmosphere(data, 'visibility');
                analysis.hour_to_sunset = hour_to(data, 'sunset');
                analysis.hour_to_sunrise = hour_to(data, 'sunrise');
                
                console.log(analysis);
            }
        });
    }
    get_weather();
}, 'jsonp');

// application set up

var is_drawing = false;

var x,
    y,
    last_x,
    last_y;
    
var build_canvas = function(id) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return ctx;
}

var drawing = build_canvas('drawing');

// drawing function/s

function color(h, s, l, a) { return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')'; }

function brush(x, y, radiusX, radiusY, rotation, startAngle, endAngle, pressure, color) {
    drawing.save();
    drawing.beginPath();
    drawing.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
    drawing.fillStyle = color,
    drawing.shadowBlur = pressure;
    drawing.shadowColor = color;
    drawing.shadowOffsetX = radiusX;
    drawing.shadowOffsetY = radiusY;
    drawing.closePath();
    drawing.fill();
    drawing.restore();
}

// drawing application

drawing.canvas.onmousedown = function(e) {
    is_drawing = true;
    last_x = e.x;
    last_y = e.y;
}

drawing.canvas.onmousemove = function(e) {
    if (is_drawing == true) {
        x = e.x;
        y = e.y;
        brush(x, y, analysis.wind_speed + analysis.temp_low, analysis.wind_speed + analysis.temp_high, analysis.wind_direction * Math.PI/180, 0, 2 * Math.PI, analysis.pressure, color((Math.abs(analysis.hour_to_sunset/24))*360, (analysis.temp_avg/analysis.temp_high)*100, (analysis.temp_low/analysis.temp_avg)*100, (analysis.humidity/100)*360));
    }
}

drawing.canvas.onmouseup = function(e) {
    is_drawing = false;
    x = y = last_x = last_y = 0;
    localStorage.setItem(drawing, drawing.canvas.toDataURL());
}

$(document).ready(function() {
    var dataURL = localStorage.getItem(drawing);
    var img = new Image;
        img.src = dataURL;
        img.onload = function () {
        drawing.drawImage(img, 0, 0);
    };
})