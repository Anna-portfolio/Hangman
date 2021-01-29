var homeBox  =document.querySelector(".home-box");
var instructionsBox  =document.querySelector(".instructions-box");
var gameBox  =document.querySelector(".game-box");
var winnerBox  =document.querySelector(".winner-box");
var gameoverBox  =document.querySelector(".gameover-box");

var hint = document.getElementById("hint");
var letterSpace = document.getElementById("letter-space");
var form = document.getElementById("form");
var formInput = document.querySelector(".form-input");
var btnInput = document.querySelector(".btn-input");
var attempts = document.getElementById("attempts");
var skulls = document.getElementsByClassName("skull");
var hangman = document.getElementsByClassName("hangman");

const hangmanWinnerAnswer = document.querySelector("#hangman-winner-answer");
const hangmanGameOverAnswer = document.querySelector("#hangman-gameover-answer");


let wordsArray = [
  {
    hint: "A big white parrot, typically with a yellow crest and blue eyes",
    answer: "cockatoo",
  },
  {
    hint: "A motor vehicle with two or three wheels",
    answer: "motorbike",
  },
  {
    hint: "A piece of furniture with soft arm rest",
    answer: "armchair",
  },
  {
    hint: "A surface intended to foot traffic, frequently made of brick or cobblestone",
    answer: "pavement",
  },
  {
    hint: "A kitchen utensil consisting of a small bowl and a handle",
    answer: "tablespoon",
  },
  {
    hint: "A large reptile with a long tail, living in the tropics",
    answer: "crocodile",
  },
  {
    hint: "A small pet with oval-shaped ears and black eyes",
    answer: "hamster",
  },
  {
    hint: "A plant with a big flower head and yellow petals",
    answer: "sunflower",
  },
  {
    hint: "The science of space, stars, and planets",
    answer: "astronomy",
  },
  {
    hint: "A standing wooden closet filled with clothes, shoes etc.",
    answer: "wardrobe",
  }
]

formInput.addEventListener("keydown", function(e){
    if(e.keyCode === 13){
      submitAnswer();
    }
})

btnInput.addEventListener("click", function(){
  submitAnswer();
})

function showInstructions(){
  instructionsBox.classList.remove("hide");
}

function closeInstructions(){
  instructionsBox.classList.add("hide");
}

var id = wordsArray[Math.floor(Math.random() * wordsArray.length)];
var randomHint = id.hint;
var randomAnswer = id.answer;
var randomArray = [];

function randomWord(){
  hint.innerHTML = "Hint: " + randomHint;

  for (var i = 0; i < randomAnswer.length; i++) {
    randomArray[i] = "_";
  }
}

function addSpace(){
  var spaceArray = randomArray.join(" ");
  letterSpace.innerHTML = spaceArray;
}

var n = 0;
var q = 0;

function removeSkull(){
  skulls[n++].classList.add("graySkull");
  hangman[q++].classList.remove("hide");
}

var toGuess = randomArray.length;

function submitAnswer(){
  let userIn = document.forms["form"]["text"].value;
  let userInput = userIn.toLowerCase();

  for(let i = 0; i < randomAnswer.length; i++){
    if(userInput === randomAnswer[i]){
      randomAnswer[i] = userInput;
      randomArray[i] = userInput;
      addSpace();
      toGuess--;
      form.reset();

      if(!randomArray.includes("_")){
        form.reset();
        winnerBox.classList.remove("hide");
      }
    }else if(!hangman[4].classList.contains("hide")){
      gameoverBox.classList.remove("hide");
      form.reset();
      }else{
        if(!randomAnswer.includes(userInput)){
          form.reset();
          removeSkull().addOnce();
      }
    }
  }
hangmanWinnerAnswer.innerHTML = "The answer was: " + randomAnswer.toUpperCase();
hangmanGameOverAnswer.innerHTML = "The answer was: " + randomAnswer.toUpperCase();
}


function startGame(){
  homeBox.classList.add("hide");
  gameBox.classList.remove("hide");

  randomWord();
  addSpace();
}

function resetGame(){
  
  for(let i = 0; i < hangman.length; i++){
    hangman[i].classList.add("hide");
  }
  
  for(let j = 0; j < skulls.length; j++){
    skulls[j].classList.remove("graySkull");
  }

  randomHint = "";
  randomAnswer = "";
  hint.innerHTML = "";
  letterSpace.innerHTML = "";
  randomArray = [];
  n = 0;
  q = 0;
}


function tryAgain() {
  winnerBox.classList.add("hide");
  gameoverBox.classList.add("hide");
  resetGame();
  form.reset();

  id = wordsArray[Math.floor(Math.random() * wordsArray.length)];
  randomHint = id.hint;
  randomAnswer = id.answer;
  
  startGame();
}

function goHome() {
  window.location.reload();
}
