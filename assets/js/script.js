var questionEl = document.getElementById("question");
var bodyEl = document.getElementById("body");
var answerListEl = document.getElementById("answerList");
var mainEl = document.querySelector("main");
var startParagraph = document.getElementById("start-paragraph");
var answerEl = document.getElementById("answer");
var timerEl = document.getElementById("timer");

var listEl1 = document.createElement("li");
var listEl2 = document.createElement("li");
var listEl3 = document.createElement("li");
var listEl4 = document.createElement("li");

var startbtnEl = document.createElement("button");
var answer1BtnEl = document.createElement("button");
var answer2BtnEl = document.createElement("button");
var answer3BtnEl = document.createElement("button");
var answer4BtnEl = document.createElement("button");

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

var firstPage = function () 
{
    questionEl.textContent = "Coding Quiz Challenge"

    startParagraph.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds! ";

    startbtnEl.textContent = "Start Quiz";

    listEl1.appendChild(startbtnEl);
    answerListEl.appendChild(listEl1);
}

var quiz = function()
{
    if (questionEl.textContent === "Coding Quiz Challenge")
    {
        timer = 75;
        timerEl.textContent = timer;
        startCountdown = setInterval (countdown,1000);

        bodyEl.removeChild(startParagraph);
       // answerListEl.removeChild(listEl1);
        listEl1.removeChild(startbtnEl);
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

    
    if(selectedAnswer === questionsPool[questionNo].c)
    {
        answerEl.textContent= "Correct!";
    }
    else
    {
        answerEl.textContent= "Wrong!";
        timer= timer-20;
    
    }
    
    questionNo++;
    if(questionNo < questionsPool.length)
    {
        quiz();
    }
    else
    {
        
        endQuiz();
    }
} 

var countdown = function()
{
    timer--;
    timerEl.textContent=timer;
    if(timer === 0)
    {
        endQuiz();
    }
} 

var endQuiz = function()
{
    clearInterval(startCountdown);

    listEl1.removeChild(answer1BtnEl);
    answerListEl.removeChild(listEl2);
    answerListEl.removeChild(listEl3);
    answerListEl.removeChild(listEl4);

    questionEl.textContent = "All done!";
    bodyEl.appendChild(startParagraph);
    startParagraph.textContent = "Your final score is " + timer; 
    


}

var score = function ()
{

}

firstPage();


startbtnEl.addEventListener("click", quiz);
answer1BtnEl.addEventListener("click", checkAnswer);
answer2BtnEl.addEventListener("click", checkAnswer);
answer3BtnEl.addEventListener("click", checkAnswer);
answer4BtnEl.addEventListener("click", checkAnswer);
answer1BtnEl.addEventListener("submit", score);


