var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var gameStarter = true;
var level = 0;

//Detecta la primera keypress y comienza el juego, luego queda obsoleto.
$(document).keypress(function(){
  while (gameStarter){
  nextSequence();
  gameStarter = false;
}});

//Secuencia npc
function nextSequence(){
  userPattern = [];

  var randomNumber = Math.floor(Math.random()*4) //Selecciona número random
  var randomColor = buttonColors[randomNumber];

  gamePattern.push (randomColor);

  var i = 0;                  //  set your counter to 1

  function myLoop() {         //  create a loop function
    setTimeout(function() {   //  call a 3s setTimeout when the loop is called
      $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
      playSound(gamePattern[i])  //  your code here
      i++;                    //  increment the counter
      if (i < gamePattern.length) {           //  if the counter < 10, call the loop function
        myLoop();             //  ..  again which will trigger another
      }                       //  ..  setTimeout()
    }, 500)
  }

myLoop();

  $("h1").text("Nivel " + (level + 1)); //Cambia el título e incrementa el nivel.
  level++;
}

//Handle clicks del usuario
$(".btn").on("click", function(event){
  var userChosenColor = event.target.id;
  userPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userPattern.length-1);
})

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userPattern[currentLevel]){ //Chequea que la respuesta del usuario sea igual al gamePattern
    if (gamePattern.length === userPattern.length){
      setTimeout(function(){
        nextSequence(); //Espera 1 segundo y muestra otro color.
      }, 1000);
    }
  } else { //Que hacer si el usuario contesta mal.
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("GAME OVER, presiona una tecla para reiniciar.");
    gameOver()
  }
}

function gameOver() {
  level = 0;
  gamePattern = [];
  gameStarter = true;
}

//Reproducir sonidos
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

//Animación al clickear botón
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
  //Quita la clase luego de 100ms
}
