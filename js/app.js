//Problem: no user interaction causes change to app
//Solution: show changes when user interacts
var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;
//toggle class for each color pallete when user clicks

//when clicking on control list items
$('.controls').on("click", "li", function() {
  //deselect sibbling elements
  $(this).siblings().removeClass("selected");
  //select clicked item
  $(this).addClass("selected");
  //cache current color here
  color = $(this).css("background-color");
});
  



//When "New Color" is pressed 
$("#revealColorSelect").click(function() {
  //show color select or hide the color select 
  changeColor();
  $("#colorSelect").toggle();
});
  
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
}

//when color sliders change
$("input[type=range]").change(changeColor);  

//when "Add Color" is pressed
$("#addNewColor").click(function() {
  //append the color to the controls ul
  var $newColor =  $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  //select the new color
  $newColor.click();
});
  
//on mouse events on the canvas 
$canvas.mousedown(function(e) {
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e) {
  //draw lines
  if (mouseDown) {
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e;
  }
}).mouseup(function() {
  mouseDown = false;
}).mouseleave(function() {
  $canvas.mouseup();
});


  