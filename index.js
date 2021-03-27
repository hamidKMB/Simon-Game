var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  //random Number Validating
  var randomChosenColour = buttonColours[randomNumber];
  //Choose a buttonColor
  gamePattern.push(randomChosenColour);
  console.log("calling nextSequence : " + gamePattern);
  //Adding chosen Color to the Game Pattern

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  //button flashs

  playSound(randomChosenColour);
  //selecting the Audio and playing video
  level++;
  $("h1").html("level " + level);
}

$(".btn").click(function() {
  //clicking the buttonColours

  var userChosenColour = $(this).attr("id");
  //Store the id of the buttons

  playSound(userChosenColour);
  //make Sound when clicking buttons

  animatePress($(this));
  //make animate

  userClickedPattern.push(userChosenColour);
  //pushing the value of id into the userClickedPattern
  checkAnswer(userClickedPattern.length - 1);
});



function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  currentColour.addClass("pressed");
  setTimeout(function() {
    currentColour.removeClass("pressed")
  }, 100);
}

$("body").keydown(function(event) {
  level = 0;
  nextSequence();
  //press any key to start the game

});

$(".Start-by-click").click(function(){
  level = 0;
  nextSequence();
  //start by clicking
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("true");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press Any Key to Restart");
    resetGame();
  }
}


function resetGame(){
  gamePattern =[];
  level = 0;
}
