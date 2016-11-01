var redirect = [];
var source = [];

var record_previous = $('#previous'),
    record_time = $('#time'),
    record_location = $('#country'),
    content = $('#content'),
    white_screen = $('#white_screen'),
    current_redirect,
    current_location,
    current_time;
    
var time_accessed = function() {
    var date = new Date(),
        record,
        hour = date.getHours(),
        minutes = date.getMinutes(),
        month = date.getMonth(),
        day = date.getDate(),
        year = date.getFullYear(),
        time_of_day;
    if (minutes.toString().length < 2) { minutes = '0' + minutes.toString(); }
    if (hour > 12) { 
        hour = hour - 12;
        if (hour == 0) {
            hour = hour + 1;
        }
        time_of_day = ' PM';
    } else if (hour == 12) {
        time_of_day = ' PM';
    } else {
        time_of_day = ' AM';
    }
    record = month + '.' + day + '.' + year + ', ' + hour + ':' + minutes + time_of_day;
    return record;
};

var record_redirect = function() {
    // current_redirect = 'http://www.google.com';
    current_time = time_accessed();
    // Set Cookies here.
    var random = Math.floor(Math.random()*redirect.length);
    var current_redirect = redirect[random];
    var current_location = source[random];
    Cookies.set('current_redirect', current_redirect);
    Cookies.set('current_time', current_time);
    open_redirect(current_redirect, current_location, current_time);
    console.log(Cookies.get('current_redirect'), Cookies.get('current_time'));
};

var open_redirect = function(current_redirect, current_location, current_time) {
    record_location.html(current_location);
    record_previous.html(current_redirect).attr('href', current_redirect);
    record_time.html(current_time);
    window.open(current_redirect);
};

content.scroll(function() {
    var countdown = white_screen.offset().top;
    if (countdown == 0) {
        white_screen.hide();
        setTimeout(function() { white_screen.show(); }, 250);
        record_redirect();
    }
    clearTimeout(content.data(this, 'timer'));
    content.data(this, 'timer', setTimeout(function() { $('#logo').html('...'); }, 250));
    $('#logo').html('Redirecting');
});

$.ajax({
    url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Frss.news.yahoo.com%2Frss%2Ftopstories%22&format=json&diagnostics=true&callback=cbfunc',
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback: 'cbfunc',
    success: function(data){
        current_redirect;
        var json_data = data.query.results.item;
        var no_items= json_data.length;  
        for(var i=0;i<no_items;i++){  
            current_redirect = json_data[i].link;  
            current_location = json_data[i].source.content;
            redirect[i] = current_redirect;
            source[i] = current_location;
        }
    }
})