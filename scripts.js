const startBtn = document.getElementById("play");
const playingField = document.getElementById("playingField");
const snake = document.getElementById("snake");

const score = document.getElementById("score");
const recordScore = document.getElementById("recordScore");

const playingFieldSize = {
  width: 1200,
  height: 600,
};
const cellSize = {
  width: 30,
  height: 30,
};
const cellForField = {
  width: playingFieldSize.width / cellSize.width,
  height: playingFieldSize.height / cellSize.height,
};

let snakeStartSize = 5;
let snakePiece = [];
let snakeHeadPosition = {
  x: playingFieldSize.width / 2,
  y: playingFieldSize.height / 2,
};
let moveDirection = "left";

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

const randomOffset = () => {
  let x = Math.floor(Math.random() * cellForField.width) * cellSize.width;
  let y = Math.floor(Math.random() * cellForField.height) * cellSize.height;
  console.log(x, y);

  return { x, y };
};

const spawnFood = () => {
  let offset = randomOffset();
  const createFood = document.createElement("div");
  createFood.classList.add("food");
  createFood.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
  console.log("spawn food", createFood);

  return playingField.appendChild(createFood);
};

const spawnSnake = () => {
  let snakeCellPositionY = snakeHeadPosition.y;
  let snakeCellPositionX = snakeHeadPosition.x;
  for (let i = 0; i < snakeStartSize; i++) {
    const createSnake = document.createElement("div");
    createSnake.classList.add("snakeCell");
    createSnake.id = i;
    /*createSnake.style.marginTop = `${snakeCellPositionY}px`;
    createSnake.style.marginLeft = `${snakeCellPositionX}px`;*/
    createSnake.style.transform = `translate(${snakeCellPositionX}px, ${snakeCellPositionY}px)`;
    snakeCellPositionX += cellSize.width;
    snakePiece.push(createSnake);
    console.log("snakePiece", snakePiece);

    playingField.appendChild(createSnake);
  }
};

const checkCollisionSnake = () => {};

const checkCollisionFoodWithSnake = () => {
  /*if () {
    spawnFood();
  }*/
};

const controlSnake = (event) => {
  if (
    (event.key.toLowerCase() === "a" ||
      event.key.toLowerCase() === "ф" ||
      event.key == "ArrowLeft") &&
    moveDirection !== "right"
  ) {
    moveDirection = "left";
  } else if (
    (event.key.toLowerCase() === "d" ||
      event.key.toLowerCase() === "в" ||
      event.key == "ArrowRight") &&
    moveDirection !== "left"
  ) {
    moveDirection = "right";
  } else if (
    (event.key.toLowerCase() === "w" ||
      event.key.toLowerCase() === "ц" ||
      event.key == "ArrowUp") &&
    moveDirection !== "down"
  ) {
    moveDirection = "top";
  } else if (
    (event.key.toLowerCase() === "s" ||
      event.key.toLowerCase() === "ы" ||
      event.key == "ArrowDown") &&
    moveDirection !== "top"
  ) {
    moveDirection = "down";
  }
};

const moveSnake = () => {
  let tailSnake = snakePiece[snakePiece.length - 1];
  if (moveDirection === "left") {
    tailSnake.style.transform = `translate(${snakeHeadPosition.x}px, ${snakeHeadPosition.y}px)`;
    snakeHeadPosition.x -= cellSize.width;
  } else if (moveDirection === "right") {
    tailSnake.style.transform = `translate(${snakeHeadPosition.x}px, ${snakeHeadPosition.y}px)`;
    snakeHeadPosition.x += cellSize.width;
  } else if (moveDirection === "top") {
    tailSnake.style.transform = `translate(${snakeHeadPosition.x}px, ${snakeHeadPosition.y}px)`;
    snakeHeadPosition.y -= cellSize.width;
  } else {
    tailSnake.style.transform = `translate(${snakeHeadPosition.x}px, ${snakeHeadPosition.y}px)`;
    snakeHeadPosition.y += cellSize.width;
  }
  snakePiece.pop();
  snakePiece.unshift(tailSnake);
  checkCollisionFoodWithSnake();

  console.log("snakePiece", moveDirection);
  /*let tailSnake = snakePiece[snakePiece.length - 1];
  snakePiece[0].marginLeft += cellSize.width * snakePiece.length;
  snakePiece.push(tailSnake);
  snakePiece.pop();*/
};

const changeFrame = () => {
  moveSnake();
  checkCollisionSnake();
  getRecordScore();
};

const mainLoop = () => {
  mainAnimationFrame = setInterval(changeFrame, 300);
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
    console.log("data");
  }
};

startBtn.addEventListener("click", gameStart);
playingField.addEventListener("click", gameStart);
