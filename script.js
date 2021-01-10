
// Declare Variables
var startButton = document.getElementById("startBtn");
var submitButton = document.getElementById("submitBtn");
var homePage = document.getElementById("index");
var quizPage = document.getElementById("quiz");
var initialsPage = document.getElementById("initialsPg");

var timeEl = document.querySelector(".time");
var secondsLeft = 20;

var aBtn = document.getElementById("choiceA");
var bBtn = document.getElementById("choiceB");
var cBtn = document.getElementById("choiceC");
var dBtn = document.getElementById("choiceD");  

var questionText = document.querySelector(".question");
var multChoiceA = document.querySelector(".choiceA");
var multChoiceB = document.querySelector(".choiceB");
var multChoiceC = document.querySelector(".choiceC");
var multChoiceD = document.querySelector(".choiceD");

var scoreCounter = document.querySelector(".score");
var finalScore = document.querySelector(".finalScore");
var totScore = 0;

var result = document.querySelector(".result");
var resultEl = document.getElementById("result");

var questions = [
    {
        "question": "What is your name?",
        "answer": "Answer Q0",
        "choice1": "0incorrect 1",
        "choice2": "0incorrect 2",
        "choice3": "0incorrect 3",
    },
    {
        "question": "What is your favorite color?",
        "answer": "Answer Q1",
        "choice1": "1incorrect 1",
        "choice2": "1incorrect 2",
        "choice3": "1incorrect 3",
    },
    {
        "question": "Do you like coding?",
        "answer": "Answer Q2",
        "choice1": "2incorrect 1",
        "choice2": "2incorrect 2",
        "choice3": "2incorrect 3",
    },
    {
        "question": "Question 3",
        "answer": "Answer Q3",
        "choice1": "3incorrect 1",
        "choice2": "3 incorrect 2",
        "choice3": "3 incorrect 3",
    },
    {
        "question": "Question 4",
        "answer": "Answer Q4",
        "choice1": "4incorrect 1",
        "choice2": "4incorrect 2",
        "choice3": "4incorrect 3",
    },
    {
        "question": "Question 5",
        "answer": "Answer Q5",
        "choice1": "5incorrect 1",
        "choice2": "5incorrect 2",
        "choice3": "5incorrect 3",
    },
    {
        "question": "Question 6",
        "answer": "Answer Q6",
        "choice1": "6incorrect 1",
        "choice2": "6incorrect 2",
        "choice3": "6incorrect 3",
    },
    {
        "question": "Question 7?",
        "answer": "Answer Q7",
        "choice1": "7incorrect 1",
        "choice2": "7incorrect 2",
        "choice3": "7incorrect 3",
    },
    {
        "question": "question 8?",
        "answer": "Answer Q8",
        "choice1": "8incorrect 1",
        "choice2": "8incorrect 2",
        "choice3": "8incorrect 3",
    },
    {
        "question": "Where do you like to travel?",
        "answer": "Answer Q9",
        "choice1": "9incorrect 1",
        "choice2": "9incorrect 2",
        "choice3": "9incorrect 3",
    }
]

// On Start Quiz button click, hide homePage and show quizPage
function startQuiz(){
    homePage.hidden = true;
    quizPage.hidden = false;

    quizTime();

    getQuestion();
};

// Quiz page timer 
function quizTime() {
    var timerInterval = setInterval(function() {
         secondsLeft--;
         timeEl.textContent = secondsLeft;

         if (secondsLeft <= 15){
             document.getElementById("timer").style.color = "red";
         }
 
         if(secondsLeft <= 0) {
             secondsLeft = 0;
             timeEl.textContent = secondsLeft;
             clearInterval(timerInterval);
             finalScore.textContent= totScore;
             // Show initials page, hide quizPage
             quizPage.hidden = true;
             initialsPage.hidden = false;
            } 
         }, 1000);
}

// Randomly choose a question from questions array
 function getQuestion(){
    setTimeout(function() {
        result.textContent="";
    }, 400);

        qNum = Math.ceil(Math.random()*(questions.length-1));
        questionText.textContent = questions[qNum].question;
    
       //  Shuffle an array to randomly determine location of choices
        function shuffleArray(arr) {
           for (let i = arr.length - 1; i > 0; i--) {
               console.log(i);
             const j = Math.floor(Math.random() * (i + 1));
             console.log(j);
             [arr[i], arr[j]] = [arr[j], arr[i]];
           }
         console.log(arr);
         }
         let arr = ["answer", "choice1", "choice2", "choice3"];
         shuffleArray(arr);
    
         // Insert shuffled choices into multChoice buttons
         var A = arr[0];
         var B = arr[1];
         var C = arr[2];
         var D = arr[3];
    
        multChoiceA.textContent = questions[qNum][A];
        multChoiceB.textContent = questions[qNum][B];
        multChoiceC.textContent = questions[qNum][C];
        multChoiceD.textContent = questions[qNum][D];
 }

//  Check if clicked button contains correct answer
 function ansCheck(){
     var selection = this.textContent
     if(questions[qNum].answer == selection){

         totScore++;
         scoreCounter.textContent = totScore;

         result.textContent = "Correct";
         resultEl.style.color = "green"; 

         getQuestion();

     } else{
         result.textContent = "Incorrect";
         resultEl.style.color = "red";
         secondsLeft = secondsLeft - 10;
     }
 }

// Store score and player initials to localStorage
 function scoreSubmit(){

    if(!localStorage.getItem("storedPlayers")){
        localStorage.setItem("storedPlayers","[]");
    }
    if(!localStorage.getItem("storedScores")){
        localStorage.setItem("storedScores","[]");
    }

    var storedPlayers = JSON.parse(localStorage.getItem("storedPlayers"));
    var storedScores = JSON.parse(localStorage.getItem("storedScores"));
    var playerInitials = document.getElementById("initials").value;
    var playerScore = totScore;

    storedPlayers.push(playerInitials);
    storedScores.push(playerScore);

    localStorage.setItem("storedPlayers",JSON.stringify(storedPlayers));
    localStorage.setItem("storedScores",JSON.stringify(storedScores));

    window.location.replace("highscores.html");   
}

 aBtn.onclick = ansCheck;
 bBtn.onclick = ansCheck;
 cBtn.onclick = ansCheck;
 dBtn.onclick = ansCheck;

 submitButton.onclick = scoreSubmit;

startButton.onclick = startQuiz;