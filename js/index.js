// Javascript file for Minute Math Quiz

// Define the global variables and select the fields that will need to be accessed by functions
let operand1 = 0;
let operand2 = 0;

const response = document.querySelector(".response");
const score = document.querySelector(".score_display");
const question = document.querySelector(".question");
const result = document.querySelector(".result");

const correct_sound = new Audio("sounds/correct.mp3");
const wrong_sound = new Audio("sounds/wrong.mp3");

// Main function to load on page load
function main()
{
    document.addEventListener("keydown", checkAnswer);
    response.addEventListener("animationend", (e) => {
        response.classList.remove("shake_element");
    });
    makequestion();
    countdown(1);
}

// Generate a random question
function makequestion()
{
    operand1 = Math.floor(Math.random()*9)+1;
    operand2 = Math.floor(Math.random()*9)+1;
    question.innerHTML = String(operand1) + " + " + String(operand2) + " = ";
    response.value = "";
}

// Check answer when Enter key is pressed
function checkAnswer(event)
{
    if (event.key == "Enter")
    {
        // When the correct answer is entered
        if ((operand1 + operand2) === Number(response.value))
        {
            // Tell user the answer is correct, and increment score
            play_sound(correct_sound);
            response.style.border = "3px solid green";
            result.textContent = "Correct!";
            result.style.color = "green"
            score.textContent = Number(score.textContent) + 1

            // After 300 ms, clear the result message and generate next question
            setTimeout(() => {
                response.style.border = "3px solid black";
                makequestion();
                result.textContent = "";
            }, 300);
        }

        // When an incorrect answer is entered
        else
        {
            // Tell user it's not correct by shaking the text box and clearing it, and showing result message
            play_sound(wrong_sound);
            response.value = "";
            response.classList.add("shake_element");
            response.style.border = "3px solid red";
            result.style.color = "red";
            result.textContent = "Incorrect. Try again!";
        }
    }
}

// Countdown timer
// Source: https://gist.github.com/adhithyan15/4350689
function countdown(minutes) 
{
    let seconds = 60;
    let mins = minutes
    function tick() {
        let counter = document.querySelector(".timer_display");
        let current_minutes = mins-1
        seconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if (seconds > 0) 
        {
            setTimeout(tick, 1000);
        } 
        else 
        {
            setTimeout(function()
            {
                if (mins > 1)
                {
                    countdown(mins-1);
                }
            }, 1000);
        }
    }
    tick();
}

// Play the sound effect specified
function play_sound(sound)
{
    sound.currentTime = 0;
    sound.play();
}

main();