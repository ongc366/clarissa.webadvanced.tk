var redirects = [],
    redirect = [];

var news_sources = {
                'YAHOO': {url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Frss.news.yahoo.com%2Frss%2Ftopstories%22&format=json&diagnostics=true&callback=top_stories', callback: 'top_stories'},
                'CNN': {url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Frss.cnn.com%2Frss%2Fcnn_topstories.rss%22&format=json&diagnostics=true&callback=cnn_topstories', callback: 'cnn_topstories'},
                'NYTIMES': {url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fwww.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FWorld.xml%22&format=json&diagnostics=true&callback=World', callback: 'World'},
                'GUARDIAN': {url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22https%3A%2F%2Fwww.theguardian.com%2Fworld%2Frss%22&format=json&diagnostics=true&callback=world', callback: 'world'},
                'ALJAZEERA': {url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fwww.aljazeera.com%2Fxml%2Frss%2Fall.xml%22&format=json&diagnostics=true&callback=fall', callback: 'fall'},
                'SOLE24ORE': {url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fwww.ilsole24ore.com%2Frss%2Fmondo.xml%22&format=json&diagnostics=true&callback=mondo', callback: 'mondo'},
                'TELEMUNDO': {url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fwww.telemundo52.com%2Fnoticias%2Fmundo%2F%3Frss%3Dy%26embedThumb%3Dy%26summary%3Dy%22&format=json&diagnostics=true&callback=mundo', callback: 'mundo'},
                'NPR': {url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fwww.npr.org%2Frss%2Frss.php%3Fid%3D1001%22&format=json&diagnostics=true&callback=rss_php', callback: 'rss_php'},
                'LE MONDE': {url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fwww.lemonde.fr%2Fm-actu%2Frss_full.xml%22&format=json&diagnostics=true&callback=rss_full', callback:'rss_full'},
                'JAPAN TIMES': {url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fwww.japantimes.co.jp%2Ffeed%2Ftopstories%2F%22&format=json&diagnostics=true&callback=topstories', callback:'topstories'}
              };

var body = $('body'),
    white_screen = $('.white_screen'),
    logo = $('.logo'),
    news_source = $('.news_source'),
    title = $('.title'),
    date = $('.date'),
    print_screen = $('.print_screen'),
    content = $('.content'),
    browser = $(window),
    mode = 'mode_a';

browser.scroll(function() {
  var text = '';
  var countdown = white_screen.position().top - window.innerHeight;
  if (countdown == window.innerHeight) {
      white_screen.hide();
      logo.html('&#8631; Loading&nbsp;');
      content.hide();
      print_articles();
      setTimeout(function() {
          white_screen.show();
          logo.html('&#8631;');
          content.show();
          body.scrollTop(0);
      }, 1000)
  }
  clearTimeout($(this).data(this, 'timer'));
  browser.data(this, 'timer', setTimeout(function() { logo.html('&#8631;'); }, 300));
  logo.html('&#8631; Redirect&nbsp;');
})

logo.click(function() {
  if(mode == 'mode_a') {
    $('.mode_a, .white_screen').addClass('hidden');
    $('.mode_b').removeClass('hidden');
    mode = 'mode_b';
  } else {
    $('.mode_a, .white_screen').removeClass('hidden');
    $('.mode_b').addClass('hidden');
    mode = 'mode_a';
  }
})

var get_date = function() {
    var date = new Date(),
        hour = date.getHours(),
        minutes = date.getMinutes(),
        month = date.getMonth(),
        day = date.getDate(),
        year = date.getFullYear(),
        time_of_day;

    if (minutes.toString().length < 2) { minutes = '0' + minutes.toString(); }
    if (hour > 12) {
        hour = hour - 12;
        time_of_day = ' PM';
    } else if (hour == 0) {
        hour = 12;
        time_of_day = ' AM';
    } else if (hour == 12) {
        time_of_day = ' PM';
    } else {
        time_of_day = ' AM';
    }
    var record = (month + 1) + '.' + day + '.' + year + ', ' + hour + ':' + minutes + time_of_day;
    return record;
};

var piece_to_crop = ['HTTP://', 'HTTPS://', 'WWW.', '.HTML', '.COM', '.CO', '.UK', '.ORG'];

var make_title = function(title) {
    var new_title = title;
    for (var i = 0; i < piece_to_crop.length; i++) {
        if (new_title.search(piece_to_crop[i])) {
            new_title = new_title.replace(piece_to_crop[i].toLowerCase(), '');
        }
    }
    return new_title;
}

var get_articles = function(current_source) {
    $.ajax({
        url: news_sources[current_source].url,
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: news_sources[current_source].callback,
        success: function(data){
            var json_data = data.query.results.item;
            var no_items = 10;
            for (var i = 0; i < no_items; i++) {
                if (current_source == "YAHOO") {
                    redirect[0] = "YAHOO";
                    redirect[1] = json_data[i].link;
                }
                if (current_source == "CNN") {
                    redirect[0] = "CNN";
                    redirect[1] = json_data[i].guid.content;
                }
                if (current_source == "NYTIMES") {
                    redirect[0] = "NYTIMES";
                    redirect[1] = json_data[i].guid.content;
                }
                if (current_source == "GUARDIAN") {
                    redirect[0] = "GUARDIAN";
                    redirect[1] = json_data[i].link;
                }
                if (current_source == "ALJAZEERA") {
                    redirect[0] = "ALJAZEERA";
                    redirect[1] = json_data[i].link;
                }
                if (current_source == "SOLE24ORE") {
                    redirect[0] = "IL SOLE 24 ORE";
                    redirect[1] = json_data[i].link;
                }
                if (current_source == "PROPUBLICA") {
                    redirect[0] = "PROPUBLICA";
                    redirect[1] = json_data[i].guid.content;
                }
                if (current_source == "TELEMUNDO") {
                    redirect[0] = "TELEMUNDO";
                    redirect[1] = json_data[i].link;
                }
                if (current_source == "NPR") {
                    redirect[0] = "NPR";
                    redirect[1] = json_data[i].link;
                }
                if(current_source == "LE MONDE") {
                  redirect[0] = "LE MONDE";
                  redirect[1] = json_data[i].link;
                }
                if(current_source == "JAPAN TIMES") {
                  redirect[0] = "JAPAN TIMES";
                  redirect[1] = json_data[i].link;
                }
                redirects.push(redirect);
                redirect = [];
            }
            redirect = [];
        }
    })
}

$.get('https://ipinfo.io', function(response) {
  date.html('Scroll to redirect from your current location <scpan class="color-blue">&mdash;' + response.country + '</scpan>.');
}, 'jsonp');

var print_articles = function() {
  var random = Math.floor(Math.random()*redirects.length);
  random = redirects[random];
  title.html(make_title(random[1])).attr('href', random[1]).addClass('color-blue');
  date.html(get_date());
  Cookies.set('date', get_date());
  Cookies.set('title', make_title(random[1]));
  Cookies.set('titlehref', random[1]);
  window.open(random[1]);
}

$(document).ready(function() {
  logo.html('&#8631;');
  date.html(Cookies.get('date'));
  title.html(Cookies.get('title')).attr('href', Cookies.get('titlehref'));
  for (var i = 0; i < Object.keys(news_sources).length; i++) get_articles(Object.keys(news_sources)[i]);
  content.css('opacity', 1);
})
