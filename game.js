/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/
let gameOver = ""
let score = 0
let previousScore = score
let canvas;
let ctx;
let lives = 0
let gameLevel = 3
let results = []
let player
let win = "You Win!!"
function addPlayer(){
   player = document.getElementById("player-name").value
  document.getElementById("player-name").value = ''
  resetGame()
}

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
canvas.style.position = "absolute"
canvas.style.top = "0px"
document.body.appendChild(canvas);

let bgReady, heroReady, storeReady, policeReady, police1Ready, scooterMonsterReady, monster3Ready;
let bgImage, heroImage, storeImage, policeImage, police1Image, scooterMonsterImage, monster3Image;

let startTime = Date.now();
let SECONDS_PER_ROUND = 0;
let elapsedTime = 0;


let game = {
  startspeed: 5,
  difficulty: 1,
  listeningToKeyboard: true,
  level: 1,
};

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/canvas.png";
  heroImage = new Image();
  heroImage.onload = function () {
    // show the delivery image
    heroReady = true;
  };
  heroImage.src = "images/scooter-1.png";

  storeImage = new Image();
  storeImage.onload = function () {
    // show the place to go image
    storeReady = true;
  };
  storeImage.src = "images/store.png";

  // add objects to crash

  policeImage = new Image();
  policeImage.onload = function () {
    // show the police image
    policeReady = true;
  };
  policeImage.src = "images/police.png";

  police1Image = new Image();
  police1Image.onload = function () {
    // show the police image
    police1Ready = true;
  };
  police1Image.src = "images/police1.png";

  scooterMonsterImage = new Image();
  scooterMonsterImage.onload = function () {
    // show the scooterMonster image
    scooterMonsterReady = true;
  };
  scooterMonsterImage.src = "images/scooterMonster.png";

  monster3Image = new Image();
  monster3Image.onload = function () {
    // show the scooterMonster image
    monster3Ready = true;
  };
  monster3Image.src = "images/monster-3.png";
}


/** 
 * Setting up our characters.
 * 
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * 
 * The same applies to the store.
 */

let heroX = canvas.width - 42;
let heroY = canvas.height - 42;

let storeX = 100;
let storeY = 100;

let policeX = 200;
let policeY = 300;
let policeDirectionX = -1;

let police1X = 100;
let police1Y = 200;
let police1DirectionX = -1;
let police1DirectionY = -1;

let scooterMonsterX = 30;
let scooterMonsterY = 150;
let scooterMonsterDirectionX = -1;


let monster3X = 400;
let monster3Y = 450;
let monster3DirectionY = -1;



/** 
 * Keyboard Listeners
 * You can safely ignore this part, for now. 
 * 
 * This is just to let JavaScript know when the user has pressed a key.
*/
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here. 
  addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
  }, false);

  addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
  }, false);
}

/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the store has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
  // Update the time.
  let policespeed = game.startspeed * game.difficulty + gameLevel
  let police1speed = game.startspeed * game.difficulty + gameLevel
  let scooterMonsterspeed = game.startspeed * game.difficulty + gameLevel
  let monster3speed = game.startspeed * game.difficulty + gameLevel


  document.getElementById("button-replay").disabled = true;
  if ((SECONDS_PER_ROUND - elapsedTime) <= 0) {
    document.getElementById("button-replay").disabled = false;
    return
  }
  if (lives <= 0) {
    gameOver = "Game Over!!!"
    document.getElementById("button-replay").disabled = false;
    return
  }
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  if (38 in keysDown) { // Player is holding up key
    heroY -= 5;

  }
  if (40 in keysDown) { // Player is holding down key
    heroY += 5;
  }
  if (37 in keysDown) { // Player is holding left key
    heroX -= 5;
  }
  if (39 in keysDown) { // Player is holding right key
    heroX += 5;
  }

  // Check if player and store collided. Our images
  // are about 32 pixels big.
  if (
    heroX <= (storeX + 32)
    && storeX <= (heroX + 32)
    && heroY <= (storeY + 32)
    && storeY <= (heroY + 32)
  ) {
    // Pick a new location for the store.
    // Note: Change this to place the store at a new, random location.
    storeX = Math.random() * canvas.width - 20;
    storeY = Math.random() * canvas.height - 20;
    score++;

    if (score > 2) {
      gameLevel++

    }
    document.getElementById("previousscore").innerHTML = score
    console.log("previousScore: ", previousScore)

  }

  if (heroX >= canvas.width - 32) {
    heroX = 0;
  }

  if (heroX < 0) {
    heroX = canvas.width - 32
  }
  if (heroY >= canvas.height - 32) {
    heroY = 0;
  }

  if (heroY < 0) {
    heroY = canvas.height - 32
  }
  // To check if the police catch the driver 

  if (heroX <= (policeX + 32)
    && policeX <= (heroX + 32)
    && heroY <= (policeY + 32)
    && policeY <= (heroY + 32)
  ) {
    heroX = canvas.width - 42;
    heroY = canvas.height - 42;
    game.listeningToKeyboard = false;

    policeX = 0;
    policeY = 300;

    lives = lives - 1

    console.log("lives", lives)
    if (lives <= 0) {
      console.log("Game Over", game)
      game.listeningToKeyboard = false;
    }
  }

  policeX += policespeed * policeDirectionX;
  policeY = policeY;
  if (
    policeX >= canvas.width - 32
  ) {
    policeX = canvas.width - 32
    policeDirectionX = -1;
  } else if (
    policeX <= 0
  ) {
    policeX = 0
    policeDirectionX = 1;
  }
  // Police 2 catch

  if (heroX <= (police1X + 32)
    && police1X <= (heroX + 32)
    && heroY <= (police1Y + 32)
    && police1Y <= (heroY + 32)
  ) {
    heroX = canvas.width - 42;
    heroY = canvas.height - 42;
    game.listeningToKeyboard = false;

    police1X = 100;
    police1Y = 100;

    lives = lives - 1

    console.log("lives", lives)
    if (lives <= 0) {
      console.log("Game Over", game)
      game.listeningToKeyboard = false;
    }
  }
    // monster3 crash 

    if (heroX <= (monster3X + 42)
    && monster3X <= (heroX + 42)
    && heroY <= (monster3Y + 42)
    && monster3Y <= (heroY + 42)
  ) {
    heroX = canvas.width - 42;
    heroY = canvas.height - 42;
    game.listeningToKeyboard = false;

    monster3X = 300;
    monster3Y = 300;

    lives = lives - 1

    console.log("lives", lives)
    if (lives <= 0) {
      console.log("Game Over", game)
      game.listeningToKeyboard = false;
    }
   
  }





  // police1X += police1speed * police1DirectionX;
  // police1X = police1X;
  // if (
  //   police1X >= canvas.width - 32
  // ) {
  //   police1X = canvas.width - 32
  //   police1DirectionX = -1;
  // } else if (
  //   police1X <= 0
  // ) {
  //   police1X = 0
  //   police1DirectionX = 1;
  // }

  police1Y += police1speed * police1DirectionY;
  police1X = police1X;
  if (
    police1Y >= canvas.height - 32
  ) {
    police1Y = canvas.height - 32
    police1DirectionY = -1;
  } else if (
    police1Y <= 0
  ) {
    police1Y = 0
    police1DirectionY = 1;
  }


  monster3Y += monster3speed * monster3DirectionY;
  monster3X = monster3X;
  if (
    monster3Y >= canvas.height - 32
  ) {
    monster3Y = canvas.height - 32
    monster3DirectionY = -1;
  } else if (
    monster3Y <= 0
  ) {
    monster3Y = 0
    monster3DirectionY = 1;
  }
  // to see if the Scooter catch the driver

  if (heroX <= (scooterMonsterX + 32)
    && scooterMonsterX <= (heroX + 32)
    && heroY <= (scooterMonsterY + 32)
    && scooterMonsterY <= (heroY + 32)
  ) {
    heroX = canvas.width - 42;
    heroY = canvas.height - 42;
    game.listeningToKeyboard = false;
    lives = lives - 1

    scooterMonsterX = Math.random() * canvas.width - 32;
    scooterMonsterY = Math.random() * canvas.height - 32;

  }
  scooterMonsterX += scooterMonsterspeed * scooterMonsterDirectionX;
  scooterMonsterY = scooterMonsterY;
  if (
    scooterMonsterX >= canvas.width - 32
  ) {
    scooterMonsterX = canvas.width - 32
    scooterMonsterDirectionX = -1;
  } else if (
    scooterMonsterX <= 0
  ) {
    scooterMonsterX = 0
    scooterMonsterDirectionX = 1;
  }

};




/**
 * This function, render, runs as often as possible.
 */
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, heroX, heroY);
  }
  if (storeReady) {
    ctx.drawImage(storeImage, storeX, storeY);
  }
  if (policeReady) {
    ctx.drawImage(policeImage, policeX - 32, policeY);
  }
  if (scooterMonsterReady) {
    ctx.drawImage(scooterMonsterImage, scooterMonsterX, scooterMonsterY);
  }
  if (police1Ready) {
    ctx.drawImage(police1Image, police1X - 32, police1Y);
  }
  if (monster3Ready) {
    ctx.drawImage(monster3Image, monster3X - 32, monster3Y);
  }
  // ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 200, 40);
  // // ctx.fillText(`Score : ${score}`, 200, 20);
  // ctx.fillText(`Lives : ${lives}`, 200, 60);


  document.getElementById("game-over").innerHTML = gameOver

  document.getElementById("score").innerHTML = score
  document.getElementById("game-time").innerHTML = SECONDS_PER_ROUND - elapsedTime
  document.getElementById("lives").innerHTML = lives
  document.getElementById("playername").innerHTML = player
};


// reset game

function resetGame() {
  startTime = Date.now()
  SECONDS_PER_ROUND = 30
  lives = 3
  score = 0
  history = []
  gameLevel = 3
  
}



/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and store)
 * render (based on the state of our game, draw the right things)
 */
var main = function () {
  update();
  render();
  // Request to do this again ASAP. This is a special method
  // for web browsers. 
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();




// var myMusic = document.getElementById("music");
// function play() {
//   myMusic.play();
// 
