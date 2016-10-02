var colors = ['red', 'blue', 'green', 'green', 'green', 'green'];

$('a').mouseenter(function() {
    var bg = '';
    var info = '';
    var title = '';
    var id = this.id;
    id = id.toString();
    if (id == "hello_world") {
        info = 'Rediscovering where value is placed in the notion of work.';
        title = 'Hello World';
        bg = "red";
    } else if (id == "pattern_gen") {
        info = 'Visualizing standard mouse events through symbollic forms within the JavaScript console.';
        title = 'Pattern Generator';
        bg = "blue";
    } else if (id == "jquery_exercise") {
        info = 'An in-class JQuery exercise about a pirate flag disappearing and a leopard running in place.';
        title = 'JQuery Exercise';
        bg = "yellow";
    } else if (id == "generative_form") {
        info = 'An in-class JavaScript and JQuery exercise about generative forms and snowflakes.';
        title = 'Generative Form';
        bg = "magenta";
    } else if (id == "domain") {
        info = 'There is nothing here yet, its still a work in progress.';
        title = 'Domain';
        // bg = "lime";
    } else if (id == "sender_reciever") {
        info = 'There is nothing here yet, its still a work in progress.';
        title = 'Sender Reciever';
        // bg = "cyan";
    } else {
        info = 'Web Advanced&nbsp;Fall 2016&nbsp;Clarissa Ong&nbsp;';   
    }
    $('marquee').html(info);
    $('#project-title').show();
    $('#project-title').html(title);
    $('body').css('background-color', bg);
})

$('a').mouseleave(function() {
    $('marquee').html('Web Advanced&nbsp;Fall 2016&nbsp;Clarissa Ong&nbsp;');
    $('#project-title').hide();
})