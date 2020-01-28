// $(document).ready(function() {
//   $(".new-tweet form textarea").on("click", function() {
//     console.log(this); //The this keyword is a reference to the button
//   });
// });

$(document).ready(function() {
  $(".new-tweet form textarea").on("keydown", function(x) {
    let counter = 140 - this.value.length;
    if (true) {
      counter--;
    }
    // document.getElementById("counter").innerHTML = counter;
    $("#counter").text(counter);
    if (counter < 0) {
      $("#counter").addClass("over");
    } else {
      $("#counter").removeClass("over");
    }
  });
});
