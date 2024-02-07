import {realDictionary} from './dictionary.js';

const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");
const gameStatus = document.getElementById("gameStatus");
const playAgainBtn = document.getElementById("playAgainBtn");
let isRunning = true;

playAgainBtn.addEventListener("click", event => {
    playAgain();
})

let grid = [["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""]];

let c = 0;
let r = 0;

let word = gerateWord();
console.log(`word: ${word}`);

const keyboardKeys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
]

function gerateWord(){
    let randNum = Math.floor(Math.random() * realDictionary.length);
    return realDictionary[randNum];
}

function createBoard(){
    for(let i=0; i<5; i++){
        for(let j=0; j<5; j++){
            const newSquare = document.createElement("div");
            newSquare.classList.add("square");
            newSquare.id = `square-${i}-${j}`;
            board.append(newSquare);
        }
    }
}

function createKeyboard(){

    for(let i=0; i<keyboardKeys.length; i++){
        for(let j=0; j<keyboardKeys[i].length; j++){
            const newKey = document.createElement("button");
            newKey.classList.add("keyboardKey");
            
            if(keyboardKeys[i][j] == "⌫"){
                newKey.id = "backspace";
                newKey.addEventListener("click", event => {
                    backspace();
                });
            }
            else if(keyboardKeys[i][j] == "Enter"){
                newKey.id = "enter";
                newKey.addEventListener("click", event => {
                    enter();
                });
            }
            else{
                newKey.id = keyboardKeys[i][j].toLowerCase();
                newKey.addEventListener("click", event => {
                    enterKey(keyboardKeys[i][j]);
                });
            }
            newKey.classList.add("defaultKey");
            newKey.textContent = keyboardKeys[i][j];
            keyboard.append(newKey);
        }
        const newBr = document.createElement("br");
        keyboard.append(newBr);
    }                               
}


function enterKey(key){
    if(isRunning){
        if(grid[r][c] != "" && c<4){
            c++;
        }
        grid[r][c] = key;
        const square = document.getElementById(`square-${r}-${c}`);
        square.textContent = key;
        square.style.scale = 0.85;
        setTimeout(() => {
            square.style.scale = 1;
        }, 100);
    }
}

function backspace(){
    if(isRunning){
        grid[r][c] = "";
        const square = document.getElementById(`square-${r}-${c}`);
        square.textContent = "";
        if(c!=0){
            c--;
        }
    }
}

function enter(){
    
    if(!grid[r].includes("")){
        let placedWord = grid[r].reduce((element, accumulator) => {
            return element + accumulator;
        });
        placedWord = placedWord.toLowerCase();
        
        if(realDictionary.includes(placedWord)){

            for(let i=0; i<5; i++){
                if(grid[r][i].toLowerCase() == word[i]){

                    const square = document.getElementById(`square-${r}-${i}`);
                    square.classList.add("right");

                    const key = document.getElementById(grid[r][i].toLowerCase());
                    key.classList = "keyboardKey right";

                    squareAnimation(square);
                }
                else if(word.includes(grid[r][i].toLowerCase())){

                    const square = document.getElementById(`square-${r}-${i}`);
                    square.classList.add("wrong");

                    const key = document.getElementById(grid[r][i].toLowerCase());
                    key.classList.replace("defaultKey", "wrong");

                    squareAnimation(square);

                }
                else{

                    const square = document.getElementById(`square-${r}-${i}`);
                    square.classList.add("empty");

                    const key = document.getElementById(grid[r][i].toLowerCase());
                    key.classList.replace("defaultKey", "empty");

                    squareAnimation(square);

                }

            }
            if(placedWord == word){
                isRunning = false;
                gameStatus.textContent = "You win!"
                gameStatus.style.display = "block";
                playAgainBtn.style.display = "block";
            }
            else if(r==4 && placedWord != word){
                isRunning = false;
                gameStatus.textContent = `Word: ${word}`;
                gameStatus.style.display = "block";
                playAgainBtn.style.display = "block";
            }
            c=0;
            r++;
        }
        else{
            gameStatus.textContent = "Invalid Word";
            gameStatus.style.display = "block";

            setTimeout(() => {
                gameStatus.textContent = "";
                gameStatus.style.display = "none";
            }, 1000);
        }
    }
}

function playAgain(){

    isRunning = true;

    word = gerateWord();
    console.log(`word: ${word}`);

    gameStatus.textContent = ""
    gameStatus.style.display = "none";
    playAgainBtn.style.display = "none";

    grid = [["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""]];

    for (let i=0; i<5; i++){
        for(let j=0; j<5; j++){
            const square = document.getElementById(`square-${i}-${j}`);
            square.textContent = "";
            square.classList = "square";
        }
    }

    c=0;
    r=0;

        for(let i=0; i<keyboardKeys.length; i++){
            for(let j=0; j<keyboardKeys[i].length; j++){

                if(keyboardKeys[i][j] == "⌫"){
                    const key = document.getElementById("backspace");
                    key.classList = "keyboardKey defaultKey";
                }
                else{
                    const key = document.getElementById(keyboardKeys[i][j].toLowerCase());
                    key.classList = "keyboardKey defaultKey";
                }
            }
        }
}

function squareAnimation(square){
    square.style.scale = 0.8;
    setTimeout(() => {
        square.style.scale = 1;
    }, 100);
}

createBoard();
createKeyboard();