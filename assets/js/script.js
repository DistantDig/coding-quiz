console.log("Script linked");

var gameContainer = document.getElementById("game-container");
var questionContainer = document.getElementById("question");
var answerContainer1 = document.getElementById("answer1");
var answerContainer2 = document.getElementById("answer2");
var answerContainer3 = document.getElementById("answer3");
var answerContainer4 = document.getElementById("answer4");
var answerContainersAll = [answerContainer1, answerContainer2, answerContainer3, answerContainer4];

var timerContainer = document.getElementById("timer");

var scoreboardContainer = document.getElementById("scoreboard");
var placeFirstContainer = document.getElementById("first-place");
var placeSecondContainer = document.getElementById("second-place");
var placeThirdContainer = document.getElementById("third-place");
var placeFourthContainer = document.getElementById("fourth-place");
var placeFifthContainer = document.getElementById("fifth-place");
var placeContainterAll = [placeFirstContainer, placeSecondContainer, placeThirdContainer, placeFourthContainer, placeFifthContainer];

var initialsInputContainer = document.getElementById("form-container");
var initialsInput = document.getElementById("initials-input");

var startButton = document.getElementById("start");
var scoreboardButton = document.getElementById("scoreboad-button");

var timeLeft = 0;
var timeInterval;

var firstPlace;
var secondPlace;
var thirdPlace;
var fourthPlace;
var fifthPlace;
var newPlace;
var scoreboard = [];

var question1;
var question2;
var question3;
var possibleQuestions = [];
var possibleAnswers = [];

registerScores();

function newScoreSubmit(event) {
    event.preventDefault();
    newPlace.initials = initialsInput.value;
    newPlace.score = timeLeft;
    compareScores();
    showScoreboard();
    renderScoreboard();
    console.log(newPlace);
}

function renderScoreboard() {
    for (var i = 0; i < scoreboard.length; i++) {
        placeContainterAll[i].innerHTML = scoreboard[i].initials + ": " + scoreboard[i].score;
    }
}

function compareScores() {
    for (var i = 0; i < scoreboard.length; i++) {
        if (newPlace.score > scoreboard[i].score) {
            scoreboard[i].score = newPlace.score;
            scoreboard[i].initials = newPlace.initials;
            return;
        }
    }
}

function showScoreboard() {
    renderScoreboard();
    if (scoreboardContainer.style.visibility === "visible") {
        scoreboardContainer.style.visibility = "hidden";
        gameContainer.style.visibility = "visible";
    } else {
        scoreboardContainer.style.visibility = "visible";
        gameContainer.style.visibility = "hidden";
    }
}

function randomQuestion() {
    var indexQuestion = Math.floor(Math.random() * possibleQuestions.length);
    var indexCorrectAnswer = Math.floor(Math.random() * answerContainersAll.length);
    var indexWrongAnswer = indexCorrectAnswer + 1;

    //Randomly selects question
    questionContainer.innerHTML = possibleQuestions[indexQuestion].question; 
    //Randomly places the correct answer
    answerContainersAll[indexCorrectAnswer].innerHTML = possibleQuestions[indexQuestion].answerCorrect; 
    answerContainersAll[indexCorrectAnswer].setAttribute("onClick", "submitCorrect()");

    //Fills the remaining answers with wrong answers. Applys an offset in position to prevent memorization of position
    for (var i = 0; i < answerContainersAll.length; i++) { 
        console.log(indexWrongAnswer);
        if (answerContainersAll[i].innerHTML == "") {
            if (indexWrongAnswer > answerContainersAll.length - 1) {
                indexWrongAnswer = 0;
                answerContainersAll[i].innerHTML = possibleQuestions[indexQuestion].answerWrong[indexWrongAnswer];
                answerContainersAll[i].setAttribute("onClick", "submitWrong()");
                indexWrongAnswer++;
            } else {
                answerContainersAll[i].innerHTML = possibleQuestions[indexQuestion].answerWrong[indexWrongAnswer];
                answerContainersAll[i].setAttribute("onClick", "submitWrong()");
                indexWrongAnswer++;
            }
        }
    }

    //Removes the selected question from being selected again
    possibleQuestions.splice(indexQuestion, 1);
    console.log(possibleQuestions);
}


function submitCorrect() {
    console.log("Correct answer submitted");

    //Clears previous questions' answers
    for (var a = 0; a < answerContainersAll.length; a++) {
        answerContainersAll[a].innerHTML = "";
        answerContainersAll[a].setAttribute("onclick", "");
    }

    //checks if all of the questions have been answered
    if (possibleQuestions[0] === undefined) {
        gameEnd();
    } else {
        randomQuestion();
    }
}


function submitWrong() {
    if (timeLeft - 5 <= 0) {
        timeLeft = 0;
    } else {
        timeLeft -= 5;
    }
    timerContainer.innerHTML = "Time Remaining: " + timeLeft;
    console.log("Wrong answer submitted");
}


function gameStart() {
    console.log("Starting new game")
    //Shows all answer buttons
    for (var i = 0; i < answerContainersAll.length; i++) {
        answerContainersAll[i].style.visibility = "visible";
    }
    startButton.style.visibility = "hidden";
    timeLeft = 60;
    timerContainer.innerHTML = "Time Remaining: " + timeLeft;
    registerQuestions();
    randomQuestion();
    startTimer();
}


function gameEnd() {
    clearInterval(timeInterval);
    //Hides all answer buttons
    for (var i = 0; i < answerContainersAll.length; i++) {
        answerContainersAll[i].style.visibility = "hidden";
    }
    questionContainer.innerHTML = "Press the button below to begin";
    gameContainer.style.visibility = "hidden";
    initialsInputContainer.style.visibility = "visible";
}

function startTimer() {
    timeInterval = setInterval( function () {
        timeLeft--;
        timerContainer.innerHTML = "Time Remaining: " + timeLeft;
        if (timeLeft <= 0) {
            timeLeft = 0;
            timerContainer.innerHTML = "Time Remaining: " + timeLeft;
            gameEnd();
        }
    }, 1000);
}

function registerScores() {
    firstPlace = {
        initials: "N/A",
        score: 0
    }
    scoreboard.push(firstPlace);

    secondPlace = {
        initials: "N/A",
        score: 0
    }
    scoreboard.push(secondPlace);

    thirdPlace = {
        initials: "N/A",
        score: 0
    }
    scoreboard.push(thirdPlace);

    fourthPlace = {
        initials: "N/A",
        score: 0
    }
    scoreboard.push(fourthPlace);

    fifthPlace = {
        initials: "N/A",
        score: 0
    }
    scoreboard.push(fifthPlace);

    newPlace = {
        initials: "test",
        score: 60
    }
}

function registerQuestions() {
    question1 = { 
        question: "This is the first question",
    
        answerCorrect: "Correct",
        answerWrong: ["Wrong1", "Wrong2", "Wrong3", "Wrong4"]
    }
    possibleQuestions.push(question1);
    
    question2 = {
        question: "This is a second test question",
    
        answerCorrect: "Correct",
        answerWrong: ["Wrong1", "Wrong2", "Wrong3", "Wrong4"]
    }
    possibleQuestions.push(question2);

    question3 = {
        question: "This is a third test question",
    
        answerCorrect: "Correct",
        answerWrong: ["Wrong1", "Wrong2", "Wrong3", "Wrong4"]
    }
    possibleQuestions.push(question3);
}