var redirect = [],
    all_redirect = [];

var previous = $('#previous'),
    time = $('#time'),
    news_source = $('#news_source'),
    content = $('#content'),
    white_screen = $('#white_screen'),
    logo = $('#logo');
    
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
        if (hour == 0) { hour = hour + 1; } 
        time_of_day = ' PM';
    } else if (hour == 12) {
        time_of_day = ' PM';
    } else {
        time_of_day = ' AM';
    }
    record = month + '.' + day + '.' + year + ', ' + hour + ':' + minutes + time_of_day;
    return record;
};

var print_redirect = function(current_news_source, current_link, current_time) {
    var pos = current_link.search('.com') + 5;
    var link_title = current_link.slice(pos, current_link.length);
    link_title = link_title.replace('.html', '');
    news_source.html(current_news_source);
    previous.html(link_title).attr('href', current_link);
    time.html(current_time);
    console.log(pos);
}

var record_redirect = function() {
    var current_time = time_accessed();
    var random = Math.floor(Math.random()*all_redirect.length);
    var current_redirect = all_redirect[random];
    var current_news_source = current_redirect[0];
    var current_link = current_redirect[1];
    Cookies.set('record_time', current_time);
    Cookies.set('record_news_source', current_news_source);
    Cookies.set('record_link', current_link);
    print_redirect(current_news_source, current_link, current_time);
    window.open(current_link);
    // console.log(Cookies.get('record_time'), Cookies.get('record_news_source'), Cookies.get('record_link'));
};

content.scroll(function() {
    var countdown = white_screen.offset().top;
    if (countdown == 0) {
        white_screen.hide();
        setTimeout(function() { white_screen.show(); }, 250);
        record_redirect();
    }
    clearTimeout(content.data(this, 'timer'));
    content.data(this, 'timer', setTimeout(function() { logo.html('...'); }, 250));
    logo.html('Redirecting');
});

$.ajax({
    url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Frss.news.yahoo.com%2Frss%2Ftopstories%22&format=json&diagnostics=true&callback=cbfunc',
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback: 'cbfunc',
    success: function(data){
        var json_data = data.query.results.item;
        var no_items= json_data.length / 4;  
        for(var i=0;i<no_items;i++){  
            redirect = [];
            var current_source = json_data[i].source.content;
            var current_link = json_data[i].link;
            redirect.push(current_source, current_link);
            all_redirect.push(redirect);
        }
        redirect = [];
    }
})