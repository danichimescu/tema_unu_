// guessNum();
// function guessNum(){
//     const randomNum = Math.floor( Math.random() * 10) + 1;
//     let guessedNum = parseInt(prompt("Choose a number from 1-10"));

//     while(guessedNum !== randomNum){
//         if(guessedNum > randomNum){
//             alert("Too high!");
//             guessedNum =  parseInt(prompt("Choose a number from 1-10"));
//         } else {
//             alert("Too low!");
//             guessedNum =  parseInt(prompt("Choose a number from 1-10"));
//         }
//     }
//     alert(`${guessedNum} is correct!`);
// }

// function OperationWithUserInput() {
//     let varUserInput = prompt(
//    'Enter 2 numbers and operation - "ex: 1,2,adunare" - :'
//     );
//    let myarr = varUserInput.split(",");
//    let numberOne = Number(myarr[0]); // ParseFloat
//    let numberTwo = Number(myarr[1]);
//    let operation = myarr[2];
//    if (isNaN(numberOne) || isNaN(numberTwo)) {
//    alert("firstNumber or secondNumber is not a number!!");
//    return;
//     }
//    let result;
//    const expr = operation;
//    switch (expr) {
//    case "adunare":
//    result =
//    " " +
//    numberOne +
//    " plus " +
//    numberTwo +
//    " este egal cu " +
//     (numberOne + numberTwo);
//    break;
//    case "scadere":
//    result = numberOne - numberTwo;
//    break;
//    case "inmultire":
//    result = numberOne * numberTwo;
//    // operator = "*";
//    break;
//    case "impartire":
//    result = numberOne / numberTwo;
//    // operator = "/";
//    break;
//    default:
//    // console.log(`Sorry, this is not an operation ${expr}.`);
//    result = `Sorry, this is not an operation ${expr}.`;
//     }
//    alert("rezulattul este: " + result);
//    }
//    OperationWithUserInput()

// var click = 0;
// function fun() {
//     click++;
//     document.getElementById("count").innerHTML = click;
//     console.log("Button clicked " + click + " times");
//     if (click === 100) {
//         alert("Ai atins 100 de click-uri!");
//         click = 0;
//         document.getElementById("count").innerHTML = click;
//         console.log("Counter reset to 0");

//     }
// }
// <button id="Click Me" class="button" onclick="fun();">Click</button>
//     <p id="count">0</p>

// document.getElementById("myId").addEventListener("click", function() {
//       console.log("I was clicked");
// });

// document.getElementById("myId").onclick = function() {
//      console.log("I was clicked");
// }

// document.getElementById("myId").addEventListener("click", function(event) {
//     console.log(event);
// });

// document.getElementById("myId").onclick = function(event) {
//     console.log(event);
// }

// document.getElementById("myId").removeEventListener("click", function(event) {
//     console.log(event);
// });

// function fun() {
//     let resetVal = Number(document.getElementById("ResetValue").value);
//     if(resetVal === 0 || isNaN(resetVal)){
//         alert("Introduceti un numar de reset.");
//         return;
//     }
//     let click = document.getElementById("count").innerHTML;
//     click++;
//     document.getElementById("count").innerHTML = click;
//     console.log("Button clicked " + click + " times");
//     if (click === resetVal) {
//         alert("Ai atins "+click+" de click-uri!");
//         click = 0;
//         document.getElementById("count").innerHTML = click;
//         console.log("Counter reset to 0");
//     }
// }

// Game

// Solved the 1st problem wihout the function by changing the inner.HTML to inner.text + adding the text from the div related.

// let userWin = 0;
// let computerWin = 0;

// function choiceFunction() {
//     let options = ["rock", "paper", "scissors"];
//     let Choice = options[Math.floor(Math.random() * options.length)];
//     return Choice;
//   }

//   function compareChoices(computerChoice, userChoice) {
//     if (computerChoice === userChoice) {
//       return "It's a tie!";
//     } else if (
//       (userChoice === "rock" && computerChoice === "scissors") ||
//       (userChoice === "paper" && computerChoice === "rock") ||
//       (userChoice === "scissors" && computerChoice === "paper")
//     ) {
//         userWin++
//         return "User wins!";
//     } else {
//         computerWin++
//         return "Computer wins!";
//     }
//   }

//   function playGame(option) {
//     var myVarChoiceComputer = choiceFunction();
//     var myVarChoiceUser = option;
//     document.getElementById("player-selection").innerText = "Player selection: " + myVarChoiceUser;
//     document.getElementById("computer-selection").innerText = "Computer selection: " + myVarChoiceComputer;

//     var returnWinner = compareChoices(myVarChoiceComputer, myVarChoiceUser);
//     document.getElementById("winner").innerText = "Winner: " + returnWinner;
//     document.getElementById("score-player").innerText = "Score player: " + userWin;
//     document.getElementById("score-computer").innerText = "Score computer: " + computerWin;
// }

// Solved the 1st problem by adding the function with the special character.

let userWin = 0;
let computerWin = 0;

function choiceFunction() {
  let options = ["rock", "paper", "scissors"];
  let Choice = options[Math.floor(Math.random() * options.length)];
  return Choice;
}

function compareChoices(computerChoice, userChoice) {
  if (computerChoice === userChoice) {
    return "It's a tie!";
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    userWin++;
    return "User wins!";
  } else {
    computerWin++;
    return "Computer wins!";
  }
}

function playGame(option) {
  var myVarChoiceComputer = choiceFunction();
  var myVarChoiceUser = option;
  let element = document.createElement("div"); //Create a div element in DOM (DOM = document.) It is not visible in HTML
  let content = document.createTextNode(myVarChoiceUser); //Create a nod text in DOM
  element.appendChild(content); //We've added to the element from line 186 the content of line 187 in DOM
  let playerSelection = document.getElementById("player-selection").innerHTML; //Save in a variable the content of the div with id "player-selection"
  document.getElementById("player-selection").appendChild(element); //We've added as a child the element from line 186 in the HTML div with id "player-selection"
  let splitElement = playerSelection.split(":"); //We split the content of the div from line 191 based on the char ":"
  if (splitElement[1] == "") {
    splitElement[1] = element; //If the 2nd position from the array splitElement is empty we add the element from line 186
  } else {
    let parent = document.getElementById("player-selection"); //We select the div element with the id "player-selection"
    parent.removeChild(parent.firstChild.nextSibling); //We delete from the line 196 element the 2nd child of the element
    splitElement[1] = document.createTextNode(myVarChoiceUser);
  }
  updateContent("computer-selection", myVarChoiceComputer);
  var returnWinner = compareChoices(myVarChoiceComputer, myVarChoiceUser);
  updateContent("winner", returnWinner);
  updateContent("score-player", userWin);
  updateContent("score-computer", computerWin);
}

function updateContent(idValue, myVarChoiceUser) {
  let element = document.createElement("div");
  let content = document.createTextNode(myVarChoiceUser);
  element.appendChild(content);
  let playerSelection = document.getElementById(idValue).innerHTML;
  document.getElementById(idValue).appendChild(element);
  let splitElement = playerSelection.split(":");

  if (splitElement[1] == "") {
    splitElement[1] = element;
  } else {
    let parent = document.getElementById(idValue);
    parent.removeChild(parent.firstChild.nextSibling);
    splitElement[1] = document.createTextNode(myVarChoiceUser);
  }
}

// Homework:
// 1. Modificati functia playGame de la linia 69 astfel incat in momenntul in care avem text si valoare in div-ul respectiv sa nu suprascriem
// sau sa nu adaugam la nesfarsit valoarea selectata.
// Hints: Creati o functie [cu 2 parametri, respectiv continutul elementului si valoarea de adaugare] care sa fie
// apelata in fiecare din cele 5 cazuri.
// Pe baza aceluasi CARACTER trebuie sa faceti o verificare, in baza verificarii adaugati sau stergeti si adaugati.
