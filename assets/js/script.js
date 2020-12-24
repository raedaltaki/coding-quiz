var questionEl = document.getElementById("question");
var bodyEl = document.getElementById("body");

var homepage = function()
{
    questionEl.textContent = "Coding Quiz Challenge"
    var startBody = document.createElement("p");
    startBody.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds! ";
    bodyEl.appendChild(startBody);

    var startbtnEl = document.createElement("button");
    startbtnEl.textContent = "Start Quiz";
    
    bodyEl.appendChild(startbtnEl);

    console.log(startBody);
};



homepage();
