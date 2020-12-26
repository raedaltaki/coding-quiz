var questionEl = document.getElementById("question");
var bodyEl = document.getElementById("body");
var mainEl = document.querySelector("main");
var startParagraph = document.getElementById("start-paragraph");
var answerEl = document.getElementById("answer");
var timerEl = document.getElementById("timer");
var viewHighScoreEl = document.getElementById("view-high-score");
var timerContainerEl = document.getElementById("timer-container");

var scoreForm = document.createElement("form");
var answerListEl = document.createElement("ul");

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
var highscores = [];

var questionNo = 0;
var timer = 0;
timerEl.textContent = timer;
var startCountdown;
var highScore = 0;



var firstPage = function () 
{
    if(questionEl.textContent === "High scores")
    {
        viewHighScoreEl.style.visibility="visible";
        timerContainerEl.style.visibility="visible";
        bodyEl.removeChild(goBackBtnEl);
        bodyEl.removeChild(clearHighScoreBtnEl);
    }

    questionNo = 0;
    timer = 0;
    timerEl.textContent = timer;

    mainEl.className = "text-center-align";
    questionEl.textContent = "Coding Quiz Challenge"

    startParagraph.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds! ";
    startParagraph.style.backgroundColor = "white";

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
        mainEl.className="text-align";

        answer1BtnEl.className ="text-align";
        answer2BtnEl.className ="text-align";
        answer3BtnEl.className ="text-align";
        answer4BtnEl.className ="text-align";
        
        listEl1.appendChild(answer1BtnEl);
        listEl2.appendChild(answer2BtnEl);
        listEl3.appendChild(answer3BtnEl);
        listEl4.appendChild(answer4BtnEl);
    
        answerListEl.appendChild(listEl1);
        answerListEl.appendChild(listEl2);
        answerListEl.appendChild(listEl3);
        answerListEl.appendChild(listEl4);

        bodyEl.appendChild(answerListEl);
        
    }

    questionEl.textContent = questionsPool[questionNo].q;
    
    answer1BtnEl.textContent ="1. " + questionsPool[questionNo].a1;
    answer2BtnEl.textContent ="2. " + questionsPool[questionNo].a2;
    answer3BtnEl.textContent ="3. " + questionsPool[questionNo].a3;
    answer4BtnEl.textContent ="4. " + questionsPool[questionNo].a4;

    setTimeout(removeFooter,2000);  
};

var checkAnswer = function()
{

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

    if(bodyEl.contains(answerListEl))
    {
        console.log(bodyEl.contains(answerListEl));
        bodyEl.removeChild(answerListEl); //check if not available remove
    }
    else
    {
        return;
    }

    questionEl.textContent = "All done!";

    startParagraph.textContent = "Your final score is " + timer; 
    bodyEl.appendChild(startParagraph);
    
    scoreForm.innerHTML = "<label for ='intials'>Enter intials: </label> <input type='text' placeholder='Your Intials' name='intials' id='intials'>";
    scoreBtnEl.textContent = "Submit"
    scoreBtnEl.type = "submit";
    scoreForm.appendChild(scoreBtnEl);
    bodyEl.appendChild(scoreForm);

    setTimeout(removeFooter,2000);


}

var score = function (event)
{
    event.preventDefault();
    var intials = document.getElementById("intials").value;

    if(!intials)
    {
        alert("Please enter your intials");
    }
    else
    {

        var player = 
        {
            name: intials,
            score: timer
        };

        highscores = loadHighscore();
        highscores.push(player);

        localStorage.setItem("highscores", JSON.stringify(highscores));
    
        highscoreView();
    }
};

var highscoreView = function ()
{
    removeFooter();
    viewHighScoreEl.style.visibility="hidden";
    timerContainerEl.style.visibility="hidden";

    if(questionEl.textContent === "All done!")
    {
        bodyEl.removeChild(scoreForm);
    }
    else if(questionEl.textContent === "Coding Quiz Challenge")
    {
        bodyEl.removeChild(startBtnEl);
        mainEl.className="text-align";
    }
    else
    {
        bodyEl.removeChild(answerListEl);
        bodyEl.appendChild(startParagraph);
        mainEl.className="text-align";
    }

    questionEl.textContent = "High scores";

    startParagraph.style.backgroundColor = "#e1cde9";
    startParagraph.style.padding = "10px";

    goBackBtnEl.textContent = "Go Back";
    clearHighScoreBtnEl.textContent = "Clear high scores";
    bodyEl.appendChild(goBackBtnEl);
    bodyEl.appendChild(clearHighScoreBtnEl);

    startParagraph.textContent = "";

    var savedHighscores= loadHighscore();
    
    
    if (!savedHighscores)
    {
        return false;
    }
    else
    {
        for (var i = 0; i < savedHighscores.length; i++) 
        {
            startParagraph.innerHTML += (i+1) + ". " + savedHighscores[i].name + " - " + savedHighscores[i].score + "<br />";
        }
    }
     
    
}

var clearHighScore = function()
{
    localStorage.clear();
    startParagraph.textContent = ""; 
}

var removeFooter = function()
{
    answerEl.style.visibility= "hidden";
}

var loadHighscore = function()
{
    var savedHighscores= localStorage.getItem("highscores");
    if (!savedHighscores)
    {
        return [];
    }
    else
    {
        savedHighscores = JSON.parse(savedHighscores);

        // var orderedHighscores = savedHighscores;
        for(var i = 0; i<savedHighscores.length; i++)
        {
            for(var j=0; j<savedHighscores.length; j++)
            {
                if (savedHighscores[i].score>savedHighscores[j].score)
                {
                    var tempName=savedHighscores[i].name;
                    var tempScore =savedHighscores[i].score;

                    savedHighscores[i].name = savedHighscores[j].name;
                    savedHighscores[i].score = savedHighscores[j].score;

                    savedHighscores[j].name = tempName;
                    savedHighscores[j].score = tempScore;
                }
            }
        }

        return savedHighscores;
    }
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
viewHighScoreEl.addEventListener("click",highscoreView);


