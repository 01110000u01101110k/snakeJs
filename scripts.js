const startBtn = document.getElementById("play");
const playingField = document.getElementById("playingField");
const snake = document.getElementById("snake");

const score = document.getElementById("score");
const recordScore = document.getElementById("recordScore");

const playingField = {
  width: 1200,
  height: 550,
};
const cellSize = {
  width: 50,
  height: 50,
};
const cellForField = {
  width: playingField.width / cellSize.width,
  height: playingField.height / cellSize.height,
};

let snake = [];
let snakeHeadPosition = {
  x: null,
  y: null,
};
let moveDirection = null;

let food = [];
let foodsPositions = [];

let isGameOver = false;
let isGamePlayed = false;
let mainAnimationFrame;

let mobile = false;
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  mobile = true;
}

const gameOver = () => {};

const getRecordScore = () => {};

const spawnFood = () => {};

const spawnSnake = () => {};

const checkCollisionSnake = () => {};

const checkCollisionFoodWithSnake = () => {
  if () {
    spawnFood();
  }
};

const controlSnake = (event) => {
  if (
    event.key.toLowerCase() === "a" ||
    event.key.toLowerCase() === "ф" ||
    event.key == "ArrowLeft"
  ) {
    moveDirection = "left";
  } else if (
    event.key.toLowerCase() === "d" ||
    event.key.toLowerCase() === "в" ||
    event.key == "ArrowRight"
  ) {
    moveDirection = "right";
  } else if (
    event.key.toLowerCase() === "w" ||
    event.key.toLowerCase() === "ц" ||
    event.key == "ArrowTop"
  ) {
    moveDirection = "top";
  } else if (
    event.key.toLowerCase() === "s" ||
    event.key.toLowerCase() === "ы" ||
    event.key == "ArrowBottom"
  ) {
    moveDirection = "bottom";
  }
};

const moveSnake = () => {
  let tailSnake = snake.length - 1;
  snake.pop();
  snake.push(tailSnake);
};

const mainLoop = () => {
  moveSnake();
  checkCollisionSnake();
  checkCollisionFoodWithSnake();
  getRecordScore();

  mainAnimationFrame = requestAnimationFrame(mainLoop);
};

const gameStart = () => {
  if (isGamePlayed) {
    alert("pause");
    isGamePlayed = false;
  } else {
    document.addEventListener("keydown", controlSnake);
    //document.addEventListener("keyup", controlPlayerRemove);
    isGamePlayed = true;
    spawnSnake();
    spawnFood();
    mainLoop();
  }
};

playingField.addEventListener("onclick", gameStart);
