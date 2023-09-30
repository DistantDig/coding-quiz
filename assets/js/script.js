console.log("Script linked");

var gameContainer = document.getElementById("container");
var questionContainer = document.getElementById("question");
var answerContainer1 = document.getElementById("answer1");
var answerContainer2 = document.getElementById("answer2");
var answerContainer3 = document.getElementById("answer3");
var answerContainer4 = document.getElementById("answer4");
var answerContainersAll = [answerContainer1, answerContainer2, answerContainer3, answerContainer4];

var question1;
var question2;

registerQuestions();

var possibleQuestions = [question1, question2];
var possibleAnswers = [];

randomQuestion();

function randomQuestion() {
    var indexQuestion = Math.floor(Math.random() * possibleQuestions.length);
    var indexCorrectAnswer = Math.floor(Math.random() * answerContainersAll.length);
    var indexWrongAnswer = indexCorrectAnswer + 1;

    //Randomly selects question
    questionContainer.innerHTML = possibleQuestions[indexQuestion].question; 
    //Randomly places the correct answer
    answerContainersAll[indexCorrectAnswer].innerHTML = possibleQuestions[indexQuestion].answerCorrect; 

    //Fills the remaining answers with wrong answers. Applys an offset in position to prevent memorization of position
    for (var i = 0; i < answerContainersAll.length; i++) { 
        console.log(indexWrongAnswer);
        if (answerContainersAll[i].innerHTML == "") {
            if (indexWrongAnswer > answerContainersAll.length - 1) {
                indexWrongAnswer = 0;
                answerContainersAll[i].innerHTML = possibleQuestions[indexQuestion].answerWrong[indexWrongAnswer];
                indexWrongAnswer++;
            } else {
                answerContainersAll[i].innerHTML = possibleQuestions[indexQuestion].answerWrong[indexWrongAnswer];
                indexWrongAnswer++;
            }
        }
    }
}

function registerQuestions() {
    question1 = { 
        question: "This is the first question",
    
        answerCorrect: "Correct",
        answerWrong: ["Wrong1", "Wrong2", "Wrong3", "Wrong4"]
    }
    
    question2 = {
        question: "This is a second test question",
    
        answerCorrect: "Correct",
        answerWrong: ["Wrong1", "Wrong2", "Wrong3", "Wrong4"]
    }
}