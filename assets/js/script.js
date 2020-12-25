var questionEl = document.getElementById("question");
var bodyEl = document.getElementById("body");
var answerListEl = document.getElementById("answerList");
var mainEl = document.querySelector("main");
var startParagraph = document.getElementById("start-paragraph");
var answerEl = document.getElementById("answer");
var timerEl = document.getElementById("timer");
var scoreForm = document.getElementById("score-form");
var viewHighScoreEl = document.getElementById("view-high-score");

var listEl1 = document.createElement("li");
var listEl2 = document.createElement("li");
var listEl3 = document.createElement("li");
var listEl4 = document.createElement("li");

var startBtnEl = document.createElement("button");
var answer1BtnEl = document.createElement("button");
var answer2BtnEl = document.createElement("button");
var answer3BtnEl = document.createElement("button");
var answer4BtnEl = document.createElement("button");
var scoreBtnEl = document.createElement("button");
var goBackBtnEl = document.createElement("button");
var clearHighScoreBtnEl = document.createElement("button");

var containerEl;

var questionsPool = 
[
    {q: "Commonly used data types DO Not Include:", a1: "strings" , a2:"booleans", a3:"alerts", a4:"numbers" , c:"alerts"},
    {q: "The condition in an if / else statement is enclosed with ___________.", a1:"quotes", a2:"curly brackets", a3:"parenthesis", a4:"square brackets" , c:"parenthesis"},
    {q: "Arrays in JavaScript can be used to store", a1:"numbers and strings", a2:"other arrays", a3:"booleans", a4:"all of the above" , c:"all of the above"},
    {q: "String values must be enclosed within _______ when being assigned to variables.", a1:"commas", a2:"curly brackets", a3:"quotes", a4:"parenthesis" , c:"quotes"},
    {q: "A very useful tool used during development and debugging for printing content to the debugger is:", a1:"JavaScript", a2:"terminal\/bash", a3:"for loops", a4:"console.log" , c:"console.log"},
];

var questionNo = 0;
var timer = 0;
timerEl.textContent = timer;
var startCountdown;
var player = "";
var highScore = 0;

var firstPage = function () 
{
    if(questionEl.textContent === "High scores")
    {
        bodyEl.removeChild(goBackBtnEl);
        bodyEl.removeChild(clearHighScoreBtnEl);
    }

    questionNo = 0;

    mainEl.style.textAlign = "center";
    questionEl.textContent = "Coding Quiz Challenge"

    startParagraph.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds! ";

    startBtnEl.textContent = "Start Quiz";

    bodyEl.appendChild(startBtnEl);



    
}

var quiz = function()
{
    if (questionEl.textContent === "Coding Quiz Challenge")
    {
        timer = 75;
        timerEl.textContent = timer;
        startCountdown = setInterval (countdown,1000);

        bodyEl.removeChild(startParagraph);
        bodyEl.removeChild(startBtnEl);
        mainEl.style.textAlign = "left";

        answer1BtnEl.style.textAlign = "left";
        answer2BtnEl.style.textAlign = "left";
        answer3BtnEl.style.textAlign = "left";
        answer4BtnEl.style.textAlign = "left";
        
        listEl1.appendChild(answer1BtnEl);
        listEl2.appendChild(answer2BtnEl);
        listEl3.appendChild(answer3BtnEl);
        listEl4.appendChild(answer4BtnEl);
    
        answerListEl.appendChild(listEl1);
        answerListEl.appendChild(listEl2);
        answerListEl.appendChild(listEl3);
        answerListEl.appendChild(listEl4);
        
    }

    questionEl.textContent = questionsPool[questionNo].q;
    
    answer1BtnEl.textContent ="1. " + questionsPool[questionNo].a1;
    answer2BtnEl.textContent ="2. " + questionsPool[questionNo].a2;
    answer3BtnEl.textContent ="3. " + questionsPool[questionNo].a3;
    answer4BtnEl.textContent ="4. " + questionsPool[questionNo].a4;

    
};

var checkAnswer = function()
{
    
    answerEl.className= "answer";

    var selectedAnswer = this.textContent;
    selectedAnswer = selectedAnswer.substring(3);
    answerEl.style.visibility= "visible";

    
    if(selectedAnswer === questionsPool[questionNo].c)
    {
        answerEl.textContent= "Correct!";
    }
    else
    {
        answerEl.textContent= "Wrong!";
        timer= timer-10;
        timerEl.textContent=timer;
    
    }
    
    questionNo++;
    if(questionNo < questionsPool.length && timer > 0)
    {
        return quiz();
    }
    else
    {
        return endQuiz();
    }
} 

var countdown = function()
{
    timer--;
    timerEl.textContent=timer;

    if(timer < 1)
    {
       return endQuiz();
    }
} 

var endQuiz = function()
{
    if(timer < 1)
    {
        timer =0;
        timerEl.textContent=timer;
    }

    clearInterval(startCountdown);

    answerListEl.removeChild(listEl1);
    answerListEl.removeChild(listEl2);
    answerListEl.removeChild(listEl3);
    answerListEl.removeChild(listEl4);

    questionEl.textContent = "All done!";
    
    scoreForm.innerHTML = "<label for ='intials'>Enter intials: </label> <input type='text' placeholder='Your Intials' name='intials' id='intials'>";
    scoreBtnEl.textContent = "Submit"
    scoreBtnEl.type = "submit";
    scoreForm.appendChild(scoreBtnEl);

    startParagraph.textContent = "Your final score is " + timer; 
    bodyEl.appendChild(startParagraph);

    

}

var score = function (event)
{
    event.preventDefault();
    player = document.getElementById("intials").value;

    var highscore = localStorage.getItem("score");
    if (!highscore)
    {
        highscore=-1;
    }
    if(timer>highscore)
    {
        localStorage.setItem("intials",player);
        localStorage.setItem("score",timer);
    }
    highscoreView();
};

var highscoreView = function ()
{
    answerEl.style.visibility= "hidden";
    var topPlayer = localStorage.getItem("intials");
    var topScore = localStorage.getItem("score");

    questionEl.textContent = "High scores";

    scoreForm.innerHTML = "";

    startParagraph.textContent = "1. " + topPlayer + " - " + topScore; 

    goBackBtnEl.textContent = "GoBack";
    clearHighScoreBtnEl.textContent = "Clear high scores";
    bodyEl.appendChild(goBackBtnEl);
    bodyEl.appendChild(clearHighScoreBtnEl);
}

var clearHighScore = function()
{
    localStorage.clear();
    startParagraph.textContent = "1. "; 
}

firstPage();


startBtnEl.addEventListener("click", quiz);
answer1BtnEl.addEventListener("click", checkAnswer);
answer2BtnEl.addEventListener("click", checkAnswer);
answer3BtnEl.addEventListener("click", checkAnswer);
answer4BtnEl.addEventListener("click", checkAnswer);
scoreBtnEl.addEventListener("click", score);
clearHighScoreBtnEl.addEventListener("click", clearHighScore);
goBackBtnEl.addEventListener("click", firstPage);
//viewHighScoreEl.onclick(score);


