var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButton = document.querySelectorAll(".mode");
var scores = 0;
var scorebox = document.getElementById("score");

init();

function init() {
  setupModeButtons();
  setupSquare();
  reset();
  if (localStorage.getItem("score")) {
    scorebox.innerHTML = `Score : ${localStorage.getItem("score")}`;
  }   
  else {
    scorebox.innerHTML = "welcome here";
  }
}

function setupModeButtons() {
  for (var i = 0; i < modeButton.length; i++) {
    modeButton[i].addEventListener("click", function() {
      modeButton[0].classList.remove("selected");
      modeButton[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? (numSquares = 3) : (numSquares = 6);

      reset();
    });
  }
}

function setupSquare() {
  for (var i = 0; i < squares.length; i++) {
    //add click listiner to square
    squares[i].addEventListener("click", function() {
      //grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      //compare color to pickedcolor
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
        scores++;
        localStorage.setItem("score", scores);
        scorebox.innerHTML = `Score : ${localStorage.getItem("score")}`;
        reset();
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
        
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
        if (scores != 0) {
          scores--;
          localStorage.setItem("score", scores);
          location.reload();
          scorebox.innerHTML = `Score : ${localStorage.getItem("score")}`;
          //   location.reload();
        }
      }
    });
  }
}

function reset() {
  colors = generateRandomColors(numSquares);
  //pick a new random color from array
  pickedColor = pickcolor();
  //change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  reset.textContent = "New Colors";

  messageDisplay.textContent = "";
  //change colors of squares
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
  scorebox.style.backgroundColor = "steelblue";
}

// easyBtn.addEventListener("click",function(){
//    hardBtn.classList.remove("selected");
//    easyBtn.classList.add("selected");
//    numSquares = 3;
//    colors = generateRandomColors(numSquares);
//     pickedColor = pickcolor();
//     colorDisplay.textContent = pickedColor;
//     for(var i = 0; i < squares.length; i++)
//     {
//         if(colors[i]) // for generating new colors of 1st row.
//         {
//             squares[i].style.backgroundColor = colors[i];
//         }
//         else // hide colors of 2nd row.
//         {
//             squares[i].style.display = "none";
//         }
//     }
// });

// hardBtn.addEventListener("click",function(){
//     hardBtn.classList.add("selected");
//     easyBtn.classList.remove("selected");
//     numSquares = 6;
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickcolor();
//     colorDisplay.textContent = pickedColor;
//     for(var i = 0; i < squares.length; i++)
//     {
//             squares[i].style.backgroundColor = colors[i];
//             squares[i].style.display = "block";
//     }
// });

resetButton.addEventListener("click", function() {
  reset();
  this.textContent = "New Colors";
  // //generate all new colors
  // colors = generateRandomColors(numSquares);
  // //pick a new random color from array
  // pickedColor = pickcolor();
  // //change colorDisplay to match picked color
  // colorDisplay.textContent = pickedColor;
  // this.textContent = "New Colors";

  // messageDisplay.textContent = "";
  // //change colors of squares
  // for(var i = 0; i < squares.length; i++)
  // {
  //     squares[i].style.backgroundColor = colors[i];
  // }
  // h1.style.backgroundColor = "steelblue";
});

// colorDisplay.textContent = pickedColor;

function changeColors(color) {
  // for changing each colors
  //loop through all squares
  for (var i = 0; i < squares.length; i++) {
    //change each color to match given color
    squares[i].style.backgroundColor = color;
  }
    scorebox.style.backgroundColor = color;
}

function pickcolor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  //make an array
  var arr = [];
  //add num random colors to arr
  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
    //get random color and push into arr
  }
  //return that array
  return arr;
}

function randomColor() {
  var r = Math.floor(Math.random() * 256); // for red
  var g = Math.floor(Math.random() * 256); // for green
  var b = Math.floor(Math.random() * 256); // for blue
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
