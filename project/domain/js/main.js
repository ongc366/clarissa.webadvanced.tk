var redirect = [],
    redirects = [];

var rec_date = $('.date'),
    rec_name = $('.name'),
    rec_source = $('.news_source'),
    white_screen = $('.white_screen'),
    logo = $('.logo'),
    countdown = white_screen.position().top,
    source,
    link;

$(window).scroll(function() {
    countdown = white_screen.position().top - window.innerHeight;
    if (countdown == window.innerHeight) { 
        white_screen.hide(); 
        $('.loading').show();
        print_redirect();
        setTimeout(function() { white_screen.show();  $('.loading').hide(); $('body').scrollTop(0) }, 250); 
    }
    clearTimeout($(this).data(this, 'timer'));
    $(window).data(this, 'timer', setTimeout(function() { logo.html('&#8631;'); }, 300));
    logo.html('&#8631; REDIRECT&nbsp;');
    console.log(countdown, window.innerHeight);
})

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

var print_redirect = function() {
    var random = Math.floor(Math.random()*redirects.length);
    random = redirects[random];
    rec_date.html(time_accessed());
    rec_source.html(random[0]);
    rec_name.html(random[1]);
    rec_name.attr('href', random[1]);
    window.open(random[1]);
}

$.ajax({
    url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Frss.news.yahoo.com%2Frss%2Ftopstories%22&format=json&diagnostics=true&callback=cbfunc',
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback: 'cbfunc',
    success: function(data){
        var json_data = data.query.results.item,
            no_items= json_data.length / 4;
        for (var i = 0; i < no_items; i++) {
            redirect = [];
            source = json_data[i].source.content;
            link = json_data[i].link;
            redirect.push(source, link);
            redirects.push(redirect);
        }
        redirect = [];
        source = '';
        link = '';
        console.log(redirects)
    }
})