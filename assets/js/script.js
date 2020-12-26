// create variables for HTML elements
var questionEl = document.getElementById("question");
var bodyEl = document.getElementById("body");
var mainEl = document.querySelector("main");
var startParagraph = document.getElementById("start-paragraph");
var answerEl = document.getElementById("answer");
var timerEl = document.getElementById("timer");
var viewHighScoreEl = document.getElementById("view-high-score");
var timerContainerEl = document.getElementById("timer-container");

// create submit form 
var scoreForm = document.createElement("form");

// create list
var answerListEl = document.createElement("ul");
var listEl1 = document.createElement("li");
var listEl2 = document.createElement("li");
var listEl3 = document.createElement("li");
var listEl4 = document.createElement("li");

// create buttons 
var startBtnEl = document.createElement("button");
var answer1BtnEl = document.createElement("button");
var answer2BtnEl = document.createElement("button");
var answer3BtnEl = document.createElement("button");
var answer4BtnEl = document.createElement("button");
var scoreBtnEl = document.createElement("button");
var goBackBtnEl = document.createElement("button");
var clearHighScoreBtnEl = document.createElement("button");

//Quiz questions array
var questionsPool = 
[
    {q: "Commonly used data types DO Not Include:", a1: "strings" , a2:"booleans", a3:"alerts", a4:"numbers" , c:"alerts"},
    {q: "The condition in an if / else statement is enclosed with ___________.", a1:"quotes", a2:"curly brackets", a3:"parenthesis", a4:"square brackets" , c:"parenthesis"},
    {q: "Arrays in JavaScript can be used to store", a1:"numbers and strings", a2:"other arrays", a3:"booleans", a4:"all of the above" , c:"all of the above"},
    {q: "String values must be enclosed within _______ when being assigned to variables.", a1:"commas", a2:"curly brackets", a3:"quotes", a4:"parenthesis" , c:"quotes"},
    {q: "A very useful tool used during development and debugging for printing content to the debugger is:", a1:"JavaScript", a2:"terminal\/bash", a3:"for loops", a4:"console.log" , c:"console.log"},
];

var highscores = []; //highscore array
var questionNo = 0;
var timer = 0;
var highScore = 0;
var startCountdown;
var questionResult;

//first page
var firstPage = function () 
{
    if(questionEl.textContent === "High scores")
    {
        viewHighScoreEl.style.visibility="visible";
        timerContainerEl.style.visibility="visible";
        bodyEl.removeChild(goBackBtnEl);
        bodyEl.removeChild(clearHighScoreBtnEl);
    }

    questionNo = 0; //reset question number
    timer = 0; //reset timer
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
    if (questionNo === 0) // for first question only
    {
        timer = 75;
        timerEl.textContent = timer;
        startCountdown = setInterval (countdown,1000); // start the timer

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

    questionEl.textContent = questionsPool[questionNo].q; // display question
    
    answer1BtnEl.textContent ="1. " + questionsPool[questionNo].a1; //display first choice
    answer2BtnEl.textContent ="2. " + questionsPool[questionNo].a2; //display second choice
    answer3BtnEl.textContent ="3. " + questionsPool[questionNo].a3; //display third choice
    answer4BtnEl.textContent ="4. " + questionsPool[questionNo].a4; //display fourth choice
};

var checkAnswer = function()
{
    clearTimeout(questionResult); //clear the timer for previous question result

    var selectedAnswer = this.textContent;
    selectedAnswer = selectedAnswer.substring(3);
    answerEl.style.visibility= "visible";
    
    if(selectedAnswer === questionsPool[questionNo].c)
    {
        answerEl.textContent= "Correct!";
    }
    else // if answer is wrong deduct 10 seconds from the timer
    {
        answerEl.textContent= "Wrong!";
        timer= timer-10;
        timerEl.textContent=timer;
    }

    questionNo++; //next question

    questionResult = setTimeout(hideFooter,1000);  //set timer 1 second to hide previous qyuestion result 
    
    if(questionNo < questionsPool.length && timer > 0) //check if there is more question and more time
    {
        return quiz();
    }
    else
    {
        return endQuiz();
    }
} 

//timer countdown
var countdown = function()
{
    timer--;
    timerEl.textContent=timer;

    if(timer < 1)
    {
        timer = 0;
        timerEl.textContent=timer;
        return endQuiz();
    }
} 

//End Quiz
var endQuiz = function()
{
    clearInterval(startCountdown); //stop the timer

    if(bodyEl.contains(answerListEl)) //check if available remove it
    {
        bodyEl.removeChild(answerListEl); 
    }
    else //if the quiz ends from the middle by view highscore button break the function
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
}

//submit score
var scoreSubmit = function (e)
{
    e.preventDefault();
    var intials = document.getElementById("intials").value;

    if(!intials) // check if the intials are entered
    {
        alert("Please enter your intials");
    }
    else
    {
        var player = //player object to save name and score
        {
            name: intials,
            score: timer
        };

        highscores = loadHighscore(); //load saved highscores
        highscores.push(player); // add new highscore to the array

        localStorage.setItem("highscores", JSON.stringify(highscores)); //save the highscores
    
        highscoreView();
    }
};

//view high scores
var highscoreView = function ()
{
    hideFooter();
    hideHeader();

    if(questionEl.textContent === "All done!") //if coming from all done page
    {
        bodyEl.removeChild(scoreForm);
    }
    else if(questionEl.textContent === "Coding Quiz Challenge") //if coming from start page
    {
        bodyEl.removeChild(startBtnEl);
    }
    else //if coming from question pages
    {
        bodyEl.removeChild(answerListEl);
        bodyEl.appendChild(startParagraph);
    }
    
    mainEl.className="text-align";

    questionEl.textContent = "High scores";

    startParagraph.style.backgroundColor = "#e1cde9";
    startParagraph.style.padding = "10px";

    goBackBtnEl.textContent = "Go Back";
    bodyEl.appendChild(goBackBtnEl);

    clearHighScoreBtnEl.textContent = "Clear high scores";
    bodyEl.appendChild(clearHighScoreBtnEl);

    printHighScores();
}

//clear saved highscore
var clearHighScore = function()
{
    localStorage.clear();
    startParagraph.textContent = ""; 
}

//hide the header (the timer and view high scores button)
var hideHeader = function()
{
    viewHighScoreEl.style.visibility="hidden";
    timerContainerEl.style.visibility="hidden";
}

//hide the footer 
var hideFooter = function()
{
    answerEl.style.visibility= "hidden";
}

//load highscores and sort them
var loadHighscore = function()
{
    var savedHighscores= localStorage.getItem("highscores");
    if (!savedHighscores) //if there is no saved highscores return empty aray
    {
        return [];
    }
    else  //else sort the highscores and return them
    {
        savedHighscores = JSON.parse(savedHighscores);

        //sort the highscores from max to min
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

//print High Scores
var printHighScores = function()
{
    startParagraph.textContent = "";

    var savedHighscores= loadHighscore(); //load the saved high scores

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

firstPage(); //start first page

// buttons Event listener
startBtnEl.addEventListener("click", quiz);
answer1BtnEl.addEventListener("click", checkAnswer);
answer2BtnEl.addEventListener("click", checkAnswer);
answer3BtnEl.addEventListener("click", checkAnswer);
answer4BtnEl.addEventListener("click", checkAnswer);
scoreForm.addEventListener("submit", scoreSubmit);
clearHighScoreBtnEl.addEventListener("click", clearHighScore);
goBackBtnEl.addEventListener("click", firstPage);
viewHighScoreEl.addEventListener("click",highscoreView);


