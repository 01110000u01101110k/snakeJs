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
let snakePiecePositions = [];
let snakePiece = [];
let snakeHeadPosition = {
  x: playingFieldSize.width / 2,
  y: playingFieldSize.height / 2,
};
let foodPosition = {
  x: null,
  y: null,
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

const gameOver = () => {
  // alert("gameOver");
};

const setScore = () => {};

const getRecordScore = () => {};

const randomOffset = () => {
  let x = Math.floor(Math.random() * cellForField.width) * cellSize.width;
  let y = Math.floor(Math.random() * cellForField.height) * cellSize.height;
  foodPosition.x = x;
  foodPosition.y = y;

  return { x, y };
};

const spawnFood = () => {
  let offset = randomOffset();
  const createFood = document.createElement("div");
  createFood.classList.add("food");
  createFood.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
  food.push(createFood);
  foodsPositions.push({ x: offset.x, y: offset.y });

  return playingField.appendChild(createFood);
};

const spawnOneSnakeCell = (snakeCellPositionY, snakeCellPositionX) => {
  const createSnake = document.createElement("div");
  createSnake.classList.add("snakeCell");
  createSnake.style.transform = `translate(${snakeCellPositionX}px, ${snakeCellPositionY}px)`;
  snakePiece.push(createSnake);
  playingField.appendChild(createSnake);

  snakePiecePositions.push({ x: snakeCellPositionX, y: snakeCellPositionY });
};

const spawnSnake = () => {
  let snakeCellPositionY = snakeHeadPosition.y;
  let snakeCellPositionX = snakeHeadPosition.x;
  for (let i = 0; i < snakeStartSize; i++) {
    spawnOneSnakeCell(snakeCellPositionY, snakeCellPositionX);
    snakeCellPositionX += cellSize.width;
  }
};

const checkCollisionSnake = () => {
  snakePiecePositions.forEach((item, index) =>
    index !== 0 &&
    item.x === snakeHeadPosition.x &&
    item.y === snakeHeadPosition.y
      ? gameOver()
      : null
  );
};

const checkCollisionFoodWithSnake = () => {
  foodsPositions.forEach((item, index) =>
    item.x === snakeHeadPosition.x && item.y === snakeHeadPosition.y
      ? playingField.removeChild(food[index]) &&
        delete food[index] &&
        delete foodsPositions[index] &&
        spawnFood() &&
        spawnOneSnakeCell(snakeHeadPosition.y, snakeHeadPosition.x) &&
        getRecordScore()
      : null
  );
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
    snakePiecePositions[snakePiece.length - 1] = {
      x: snakeHeadPosition.x,
      y: snakeHeadPosition.y,
    };
  } else if (moveDirection === "right") {
    tailSnake.style.transform = `translate(${snakeHeadPosition.x}px, ${snakeHeadPosition.y}px)`;
    snakeHeadPosition.x += cellSize.width;
    snakePiecePositions[snakePiece.length - 1] = {
      x: snakeHeadPosition.x,
      y: snakeHeadPosition.y,
    };
  } else if (moveDirection === "top") {
    tailSnake.style.transform = `translate(${snakeHeadPosition.x}px, ${snakeHeadPosition.y}px)`;
    snakeHeadPosition.y -= cellSize.width;
    snakePiecePositions[snakePiece.length - 1] = {
      x: snakeHeadPosition.x,
      y: snakeHeadPosition.y,
    };
  } else {
    tailSnake.style.transform = `translate(${snakeHeadPosition.x}px, ${snakeHeadPosition.y}px)`;
    snakeHeadPosition.y += cellSize.width;
    snakePiecePositions[snakePiece.length - 1] = {
      x: snakeHeadPosition.x,
      y: snakeHeadPosition.y,
    };
  }
  snakePiece.unshift(snakePiece.pop());
  snakePiecePositions.unshift(snakePiecePositions.pop());
  checkCollisionFoodWithSnake();
  checkCollisionSnake();
};

const changeFrame = () => {
  moveSnake();
};

const mainLoop = () => {
  mainAnimationFrame = setInterval(changeFrame, 200);
};

const deleteMainLoop = () => {
  clearInterval(mainAnimationFrame);
  mainAnimationFrame = null;
};

const gameStart = () => {
  if (isGamePlayed) {
    alert("pause");
    deleteMainLoop();
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

startBtn.addEventListener("click", gameStart);
playingField.addEventListener("click", gameStart);
