// Javascript file for Minute Math Quiz

// Global variables
let operand1 = 0;
let operand2 = 0;
let score = 0;
const TIME_SECONDS = 60;
const COUNT_IN_SECONDS = 3;

// Fields for use by the functions
const score_display = document.querySelector(".score_display");
const timer_display = document.querySelector(".timer_display");
const game_area = document.querySelector(".game_area");
const menu = document.querySelector(".menu");
const question = document.querySelector(".question");
const response = document.querySelector(".response");
const result = document.querySelector(".result");
const play_again_btn = document.querySelector("#play_again");
const result_title = document.querySelector(".result_text");

// Sound effects
const correct_sound = new Audio("sounds/correct.mp3");
const wrong_sound = new Audio("sounds/wrong.mp3");
const alarm_sound = new Audio("sounds/alarm.mp3");

// Main function to load on page load
function main()
{
    // Add event listeners to elements
    document.querySelector("#start").addEventListener("click", function()
    {
        question.innerHTML = "Ready?";
        count_in(COUNT_IN_SECONDS);
        setTimeout(start_game, (COUNT_IN_SECONDS+1)*1000);
    });
    play_again_btn.addEventListener("click", load_menu);
    load_menu();
}

// Countdown to game start after user clicks start. Default is 3 seconds.
function count_in(seconds=3)
{
    game_area.removeAttribute("hidden");
    menu.setAttribute("hidden", "");

    let num = seconds
    let countinstart = setInterval(() => {
        question.innerHTML = String(num);
        num--;
    }, 1000);

    // Cancel the count in when done
    setTimeout(() => {
        clearTimeout(countinstart);
    }, seconds*1000);
}

// Load the main menu
function load_menu()
{
    game_area.setAttribute("hidden", "");
    result.setAttribute("hidden", "");
    play_again_btn.setAttribute("hidden", "");
    result_title.setAttribute("hidden", "");
    menu.removeAttribute("hidden");

    // Reset the elements to its default state
    result.innerHTML = "";
    score = 0;
    score_display.innerHTML = String(score);
    response.style.border = "3px solid black";
    timer_display.innerHTML = "1:00";

}

// Set up the game after player presses start
function start_game()
{
    // Listen for enter key
    document.addEventListener("keydown", check_answer);

    // Add listener to remove the shake class from the response field after each shake, 
    // so it can be applied again on the next answer
    // https://teamtreehouse.com/community/shake-effect-with-javascript-only
    response.addEventListener("animationend", (e) => {
        response.classList.remove("shake_element");
    });

    // Set up the game area
    // game_area.removeAttribute("hidden");
    result.removeAttribute("hidden");
    response.removeAttribute("hidden");
    // menu.setAttribute("hidden", "");

    // Generate a new question
    make_question();

    // Set the timer for the game over screen to appear
    setTimeout(game_over_screen, TIME_SECONDS*1000);

    // Start the countdown 500ms after hitting start, to let user get aware the game has started
    countdown(TIME_SECONDS, 500);

    // Focus the cursor on the input field
    response.focus();
}

// Generate a random question
function make_question()
{
    operand1 = Math.floor(Math.random()*9)+1;
    operand2 = Math.floor(Math.random()*9)+1;
    question.innerHTML = String(operand1) + " + " + String(operand2) + " = ";
    response.value = "";
}

// Check answer when Enter key is pressed
function check_answer(event)
{
    if (event.key == "Enter")
    {
        // When the correct answer is entered
        if ((operand1 + operand2) === Number(response.value))
        {
            // Tell user the answer is correct, and increment score
            play_sound(correct_sound);
            response.style.border = "3px solid green";
            result.innerHTML = "Correct!";
            result.style.color = "green"
            score++;
            score_display.innerHTML = String(score);

            // After 300 ms, clear the result message and generate next question
            setTimeout(() => {
                response.style.border = "3px solid black";
                result.innerHTML = "";
                make_question();
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

// Countdown timer, modified version of the countdown timer by adhithyan15 on Github:
// https://gist.github.com/adhithyan15/4350689
function countdown(time, delay) 
{ 
    setTimeout(function() {
        let seconds = 60;
        let mins = time / 60;
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
    }, delay);
}

// Play the sound effect specified
function play_sound(sound)
{
    sound.currentTime = 0;
    sound.play();
}

// Display game over screen
function game_over_screen()
{
    // Prevent enter key presses being logged after game is over
    document.removeEventListener("keydown", check_answer);

    // Play the game over sound
    play_sound(alarm_sound);

    // Display final score
    result_title.removeAttribute("hidden");
    question.setAttribute("hidden", "");
    response.setAttribute("hidden", "");
    result.style.color = "green";
    result.innerHTML = "Your score is: " + String(score);
    play_again_btn.removeAttribute("hidden");
}

main();