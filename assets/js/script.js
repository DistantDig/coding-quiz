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
    // event.preventDefault();
    newPlace.initials = initialsInput.value;
    newPlace.score = timeLeft;
    compareScores();
    storeScores();
    renderScoreboard();
}

function storeScores() {
    localStorage.setItem("firstPlace-score", scoreboard[0].score);
    localStorage.setItem("secondPlace-score", scoreboard[1].score);
    localStorage.setItem("thirdPlace-score", scoreboard[2].score);
    localStorage.setItem("fourthPlace-score", scoreboard[3].score);
    localStorage.setItem("fifthPlace-score", scoreboard[4].score);

    localStorage.setItem("firstPlace-initials", scoreboard[0].initials);
    localStorage.setItem("secondPlace-initials", scoreboard[1].initials);
    localStorage.setItem("thirdPlace-initials", scoreboard[2].initials);
    localStorage.setItem("fourthPlace-initials", scoreboard[3].initials);
    localStorage.setItem("fifthPlace-initials", scoreboard[4].initials);
}

function renderScoreboard() {
    for (var i = 0; i < scoreboard.length; i++) {
        placeContainterAll[i].innerHTML = scoreboard[i].initials + ": " + scoreboard[i].score;
    }
}

function compareScores() {
    for (var i = 0; i < scoreboard.length; i++) {
        if (newPlace.score > scoreboard[i].score) {
            scoreboard.unshift(newPlace);
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
    if (localStorage.getItem("firstPlace-initials") == undefined || localStorage.getItem("firstPlace-initials") == null) {
        firstPlace = {
            initials: "N/A",
            score: 0
        }
    } else {
        firstPlace = {
            initials: localStorage.getItem("firstPlace-initials"),
            score: localStorage.getItem("firstPlace-score"),
        }
    }
    scoreboard.push(firstPlace);

    if (localStorage.getItem("secondPlace-initials") == undefined || localStorage.getItem("secondPlace-initials") == null) {
        secondPlace = {
            initials: "N/A",
            score: 0
        }
    } else {
        secondPlace = {
            initials: localStorage.getItem("secondPlace-initials"),
            score: localStorage.getItem("secondPlace-score"),
        }
    }
    scoreboard.push(secondPlace);

    if (localStorage.getItem("thirdPlace-initials") == undefined || localStorage.getItem("thirdPlace-initials") == null) {
        thirdPlace = {
            initials: "N/A",
            score: 0
        }
    } else {
        thirdPlace = {
            initials: localStorage.getItem("thirdPlace-initials"),
            score: localStorage.getItem("thirdPlace-score"),
        }
    }
    scoreboard.push(thirdPlace);

    if (localStorage.getItem("fourthPlace-initials") == undefined || localStorage.getItem("fourthPlace-initials") == null) {
        fourthPlace = {
            initials: "N/A",
            score: 0
        }
    } else {
        fourthPlace = {
            initials: localStorage.getItem("fourthPlace-initials"),
            score: localStorage.getItem("fourthPlace-score"),
        }
    }
    scoreboard.push(fourthPlace);

    if (localStorage.getItem("fifthPlace-initials") == undefined || localStorage.getItem("fifthPlace-initials") == null) {
        fifthPlace = {
            initials: "N/A",
            score: 0
        }
    } else {
        fifthPlace = {
            initials: localStorage.getItem("fifthPlace-initials"),
            score: localStorage.getItem("fifthPlace-score"),
        }
    }
    scoreboard.push(fifthPlace);

    newPlace = {
        initials: "N/A",
        score: 0
    }
}

function registerQuestions() {
    question1 = { 
        question: "How would you write an alert?",
    
        answerCorrect: "alert(\"Text here\");",
        answerWrong: ["alert = Text here;", "alert = \"Text here\";", "previous.alert(Text Here);", "previous.alert(\"Text Here\");"]
    }
    possibleQuestions.push(question1);
    
    question2 = {
        question: "How would you declar a variable in JavaScript?",
    
        answerCorrect: "var myVariable;",
        answerWrong: ["var = myVariable;", "int myVariable;", "int = myVariable;", "var(myVarable);"]
    }
    possibleQuestions.push(question2);

    question3 = {
        question: "How do you test if a value AND they type of vaiables are equal?",
    
        answerCorrect: "===",
        answerWrong: ["=", "==", "!=", "===="]
    }
    possibleQuestions.push(question3);
}