let operand1 = 0;
let operand2 = 0;

function main()
{
    document.addEventListener("keydown", checkAnswer);
    makequestion();
}

// Generate a question
function makequestion()
{
    const response = document.querySelector(".response");
    const question = document.querySelector(".question");
    operand1 = Math.floor(Math.random()*99)+1;
    operand2 = Math.floor(Math.random()*9)+1;
    question.innerHTML = String(operand1) + " + " + String(operand2) + " = ";
    response.value = "";
}

// Check answer
function checkAnswer(event)
{
    const response = document.querySelector(".response");
    if (event.key == "Enter")
    {
        if ((operand1 + operand2) === Number(response.value))
        {
            console.log("Correct!");
            makequestion();
        }
        else
        {
            alert("incorrect");
        }
        
    }
}

main();