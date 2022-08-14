let operand1 = 0;
let operand2 = 0;

const response = document.querySelector(".response");
const score = document.querySelector(".score_display");
const question = document.querySelector(".question");
const result = document.querySelector(".result");

function main()
{
    document.addEventListener("keydown", checkAnswer);
    makequestion();
}

// Generate a question
function makequestion()
{
    operand1 = Math.floor(Math.random()*99)+1;
    operand2 = Math.floor(Math.random()*9)+1;
    question.innerHTML = String(operand1) + " + " + String(operand2) + " = ";
    response.value = "";
}

// Check answer when Enter key is pressed
function checkAnswer(event)
{
    if (event.key == "Enter")
    {
        if ((operand1 + operand2) === Number(response.value))
        {
            result.textContent = "Correct!";
            result.style.color = "green"
            score.textContent = Number(score.textContent) + 1
            makequestion();
            setTimeout(clearResults, 1000);
        }
        else
        {
            response.value = "";
            result.style.color = "red"
            result.textContent = "Incorrect. Try again!";
        }
        
    }
}

function clearResults()
{
    result.textContent = "";
}

main();