/*

Instructions:

---- PART 1 ----
Start by removing that pirate flag (#pirate).

Next, add a gradient to the whole page by applying the "gradient" class to the body.

---- PART 2 ----
Now, to make things a little more complicated, let's activate the "Start" button:

When the user clicks the "Start" button, change the text of "status" to read "GO". 
Let's also change the background color of "status" to green.
Change the text of the "Start" button to read "Stop".

When the user clicks the button again, revert all of the above. 
So "status" should read "STOP", it's background color should be red, and the button itself should read "Start" again.

Hint: you will want to store the current state of the button in a variable.

---- PART 3 ----
Now that we have stored the status of our button, let's show the user an image if the mouse over our green "GO" box.

If the user has activated the button, toggle the visibility of id "cat" to reveal our animated leopard.

*/

$("#pirate").hide();
$("body").addClass("gradient");

var is_clicked = false;

$("#toggle").click(function() {
    if(is_clicked == false) {
        $("#status").html("GO");
        $("#status").css("background-color", "green");
        $("#cat").show();
        is_clicked = true;
    }else{
        $("#status").html("STOP");
        $("#status").css("background-color", "red");
        $("#cat").hide();
        is_clicked = false;
    }
})

$("#status").mouseover(function() { if(is_clicked == true) { $("#cat").toggle(); } });