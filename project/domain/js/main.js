var test = ['http://www.google.com', 'http://www.yahoo.com'];

var pos_redirect,
    pos_window;
    
var random = function() {
    var n = Math.floor(Math.random()*test.length);
    n = test[n];
    return n;
}

var time_accessed = function() {
    var date = new Date();
    var time;
    var time_of_day;
    if (date.getHours() > 12) {
        time = date.getHours() - 12;
        time_of_day = 'PM';
    } else {
        time = date.getHours();
        time_of_day = 'AM';
    }
    time = time + ':' + date.getMinutes() + ' ' + time_of_day;
    date = date.getDay() + '.' + date.getDate() + '.' + date.getFullYear() + ', ' + time;
    return date;
}

var record_redirect = function() {
    var link_to_open = random();
    $('#previous').html(link_to_open).attr('href', link_to_open);
    $('#time').html(time_accessed());
    window.open(link_to_open);
}

$('#content').scroll(function() {
    pos_window = $('#redirect').offset().top;
    if (pos_window == 0) {
        $('#redirect').hide();
        setTimeout(function() { $('#redirect').show(); }, 250);
        record_redirect();
    } 
})

$.getJSON('https://freegeoip.net/json/').always (function(location) { $('#country').html(location.country_name); });

//  $.getJSON( "https://query.yahooapis.com/v1/public/yql?q=select%20title%20from%20rss%20where%20url%3D%22http%3A%2F%2Frss.news.yahoo.com%2Frss%2Ftopstories%22&format=json&diagnostics=true&callback=").done(function( json ) {
//     jsondata =  JSON.parse(json)
//     console.log( "JSON Data: " + jsondata );
    
//   })
//   .fail(function( jqxhr, textStatus, error ) {
//     var err = textStatus + ", " + error;
//     console.log( "Request Failed: " + err );
// });