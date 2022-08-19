// Javascript file for Minute Math Quiz

// Global variables
let operand1 = 0;
let operand2 = 0;
let operation;
let score = 0;
let operand1_max;
let operand2_max;
let operations = new Array;
let level;
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
const skip_btn = document.querySelector("#skip");

// Sound effects
const correct_sound = new Audio("sounds/correct.mp3");
const wrong_sound = new Audio("sounds/wrong.mp3");
const alarm_sound = new Audio("sounds/alarm.mp3");
const countdown_sound = new Audio("sounds/countdown.mp3");

// Load the main menu
function load_menu()
{
    // Add listener for the start button
    document.querySelector("#start").addEventListener("click", start_game);

    // Hide the game components and show menu component
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

// Countdown to game start after user clicks start. Default is 3 seconds.
function count_in(seconds=3)
{
    game_area.removeAttribute("hidden");
    menu.setAttribute("hidden", "");

    let num = seconds
    setTimeout(() => play_sound(countdown_sound), 1000);
    let countinstart = setInterval(() => {
        question.innerHTML = String(num);
        num--;
    }, 1000);

    // Cancel the count in when done
    setTimeout(() => {
        clearTimeout(countinstart);
    }, seconds*1000);
}

// Set up the game after player presses start
function load_game_area()
{
    // Add listener to remove the shake class from the response field after each shake, 
    // so it can be applied again on the next answer
    // https://teamtreehouse.com/community/shake-effect-with-javascript-only
    response.addEventListener("animationend", (e) => {
        response.classList.remove("shake_element");
    });

    // Listen for enter key
    document.addEventListener("keydown", check_answer);

    // Add event listener for skip button
    skip_btn.addEventListener("click", () => {
        response.style.border = "3px solid black";
        result.innerHTML = "";
        make_question();
    });
    
    // Generate a new question
    make_question();


    // Start the countdown 1 second after hitting start, to let user react to game started
    countdown(1000);

    // Set up the game area
    result.removeAttribute("hidden");
    response.removeAttribute("hidden");

    // Focus the cursor to the text box
    response.focus();
}

// Function to load game. To run when the Start button is pressed
function start_game()
{
    // Check which operations are enabled
    operations = get_operations();
    if (operations.length == 0)
    {
        alert("You must select at least one operation!")
        return;
    }

    // Check which level is selected
    const level_checked = document.querySelector('input[name="level"]:checked');
    if (level_checked == null)
    {
        alert("You must select a level!")
        return;
    }
    set_difficulty(level_checked.value);

    question.removeAttribute("hidden");
    question.innerHTML = "Ready?";
    count_in(COUNT_IN_SECONDS);
    setTimeout(load_game_area, (COUNT_IN_SECONDS+1)*1000);
}

// Generate a random question
function make_question()
{
    // Get a random operation from the chosen operatioons, and choose a random number up to maximum defined bny the difficulty
    operation = operations[Math.floor(Math.random()*(operations.length))];
    
    // For intermediate difficulty, either operand can be the double digit number
    if (level === "intermediate" && Math.random() < 0.5)
    {
        operand1 = Math.floor(Math.random()*operand2_max)+1;
        operand2 = Math.floor(Math.random()*operand1_max)+1; 
    }

    else
    {
        operand1 = Math.floor(Math.random()*operand1_max)+1;
        operand2 = Math.floor(Math.random()*operand2_max)+1;
    }

    // Show the question to the player
    question.innerHTML = String(operand1) + " " + (operation === "addition" ? "+" : operation === "subtraction" ? "-" : "x") + " " + String(operand2) + " = ";
    response.value = "";
    skip_btn.setAttribute("hidden", "");
    response.focus();
}

// Check answer when Enter key is pressed
function check_answer(event)
{
    if (event.key == "Enter")
    {
        // When the correct answer is entered
        if (operate(operand1, operand2, operation) === Number(response.value))
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

            // Show a skip button
            skip_btn.removeAttribute("hidden");
        }
    }
}

// 1 minute countdown timer, after which the end screen appears
// https://codepen.io/masudrana2779/details/GRqzPdZ
function countdown(delay) 
{ 
    setTimeout(function() {
        var seconds = 60;
        function tick() {
            var counter = document.querySelector(".timer_display");
            seconds--;
            counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
            if (seconds > 0) 
            {
                setTimeout(tick, 1000);
            } 
            else 
            {
                game_over_screen();
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
    result_title.innerHTML = "TIMES UP!"
    result_title.removeAttribute("hidden");
    question.setAttribute("hidden", "");
    response.setAttribute("hidden", "");
    skip_btn.setAttribute("hidden", "");
    result.style.color = "green";
    result.innerHTML = "Your score is: " + String(score);

    // Add listener for play again button and show it
    play_again_btn.addEventListener("click", load_menu);
    play_again_btn.removeAttribute("hidden");
}

// Get the operations the user has selected, and returns it in an array
function get_operations()
{
    const ops = new Array();
    const operations_selected = document.querySelectorAll("input[type=checkbox]");
    for (let i = 0; i < operations_selected.length; i++)
    {
        if (operations_selected[i].checked)
        {
            ops.push(operations_selected[i].id);
        }
    }

    return ops;
}

// Set the max allowed value for each operand based on selected difficulty
function set_difficulty(difficulty)
{
    switch (difficulty)
    {
        case "easy":
            operand1_max = 9;
            operand2_max = 9;
            level = "easy";
            break;
        case "intermediate":
            operand1_max = 99;
            operand2_max = 9;
            level = "intermediate";
            break;
        case "hard":
            operand1_max = 99;
            operand2_max = 99;
            level = "hard";
            break;
    }
}

// Perform calculation on the operands with the given operation, and return the result
function operate(operand1, operand2, operation)
{
    switch (operation)
    {
        case "addition":
            return operand1 + operand2;
        case "subtraction":
            return operand1 - operand2;
        case "multiplication":
            return operand1 * operand2;
    }
}

load_menu();