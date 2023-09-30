console.log("Script linked");

var gameContainer = document.getElementById("container");
var questionContainer = document.getElementById("question");
var answerContainer1 = document.getElementById("answer1");
var answerContainer2 = document.getElementById("answer2");
var answerContainer3 = document.getElementById("answer3");
var answerContainer4 = document.getElementById("answer4");
var answerContainersAll = [answerContainer1, answerContainer2, answerContainer3, answerContainer4];
var startButton = document.getElementById("start");

var question1;
var question2;
var question3;
var possibleQuestions = [];
var possibleAnswers = [];

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
    console.log("Wrong answer submitted");
}


function gameStart() {
    console.log("Starting new game")
    //Shows all answer buttons
    for (var i = 0; i < answerContainersAll.length; i++) {
        answerContainersAll[i].style.visibility = "visible";
    }
    startButton.style.visibility = "hidden";
    registerQuestions();
    randomQuestion();
}


function gameEnd() {
    //Hides all answer buttons
    for (var i = 0; i < answerContainersAll.length; i++) {
        answerContainersAll[i].style.visibility = "hidden";
    }
    questionContainer.innerHTML = "Press the button below to begin";
    startButton.style.visibility = "visible";
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