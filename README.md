# Minute Math Quiz

### Video Demo:
https://youtu.be/g09e1biivY4

### Description:
A math quiz game created with Javascript. It is inspired from a math quiz called Hot pencils or Mad Minute, used by many elementary school teachers for teaching students basically math knowlesge, typically in grades 1-5. The goal of this game is to answer as many simple math questions correctly as you can within one minute, without assistance from electronic devices like calculators. This game is all about training your mental math skills!

### How to play:
1. Choose the operations and level of difficulty.
2. Press Start.
3. Answer the math question on the screen! Press Enter to submit the answer. The answer may be a positive or negative integer (no decimal numbers or fractions).
4. If the answer is correct, a new question will appear.
5. If the answer is incorrect, you can answer it again, or skip the question, but it will cost you 1 point.

### Levels and Supported Operations:
#### Levels
Each math question will have two operands (ex: A + B, where A and B are integers). Each operand is randomly generated based on the difficulty level. If more than one operation is selected, the operation is chosen randomly for each question.

The level of difficulty determines the range of numbers used for each operand. 

There are 3 levels of difficulty:
- Easy: single digit numbers (1-99) by single digit numbers (1-9). 
    - Examples: 1+1, 4x3, 5-2
- Intermediate: single or double digit numbers (1-99) by single digit numbers (1-9).
    - Examples: 23+5, 7x20, 12-9
- Hard: single or double digit numbers (1-99) by single or double digit numbers (1-99)
    - Examples: 12+73, 99x3, 76-21 

In intermediate level difficulty, either of the operand may be a 2-digit number, but there will only be one, 2-digit number and one, 1-digit number.

#### Operations
Currently, only addition, subtraction, and multiplication questions are supported. Divison requires handling remainders from the player, which I may look in to doing in future versions.

You may choose which of the 3 types operations will appear in the questions, and can enable/disable as you wish. For example, if you want to only do addition questions, you can turn off subtraction and multiplication questions from the options screen before starting the game.

### Files and Folders
- index.html: the main HTML file, where the game is played.
- styles/styles.css: main stylesheet for index.html
- js/index.js: main Javascript file. Contains all the logic for the game.
- sounds/*.mp3: MP3 sound files for the game sounds.
