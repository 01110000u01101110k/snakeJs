const startBtn = document.getElementById("play");
const playIcon = document.getElementById("playIcon");
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

let scoreData = -1;
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
let mainAnimationFrame = null;

let mobile = false;
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  mobile = true;
}

const setScore = () => {
  scoreData++;
  score.textContent = scoreData;
  console.log(scoreData);
};

const getRecordScore = () => {
  if (localStorage.getItem("recordScore")) {
    recordScore.textContent = localStorage.getItem("recordScore");
  }
};

const randomOffset = () => {
  let x = Math.floor(Math.random() * cellForField.width) * cellSize.width;
  let y = Math.floor(Math.random() * cellForField.height) * cellSize.height;
  if (snakePiecePositions.some((item) => item.x === x && item.y == y)) {
    return randomOffset();
  }
  foodPosition.x = x;
  foodPosition.y = y;

  return { x, y };
};

const spawnFood = () => {
  setScore();
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
  /*if (snakePiece.length % 2) {
    createSnake.classList.add("snakeCell");
  } else {
    createSnake.classList.add("snakeCellSecond");
  }*/
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
  /*for (let i = 0; i < snakePiecePositions.length; i++) {
    console.log("<s----------------->");
    console.log("snakePiecePositions", snakePiecePositions);
    console.log("snakeHeadPosition", snakeHeadPosition);

    console.log("snakePiecePositions[i].y", snakePiecePositions[i].y);
    console.log("snakeHeadPosition.y", snakeHeadPosition.y);
    console.log("snakePiecePositions[i].x", snakePiecePositions[i].x);
    console.log("snakeHeadPosition.x", snakeHeadPosition.x);
    console.log(
      "snakePiecePositions[i].x === snakeHeadPosition.x",
      snakePiecePositions[i].x === snakeHeadPosition.x
    );
    console.log(
      "snakePiecePositions[i].y === snakeHeadPosition.y",
      snakePiecePositions[i].y === snakeHeadPosition.y
    );
    console.log("<e----------------->");
  }*/

  if (
    snakePiecePositions.some(
      (item, index) =>
        index !== 0 &&
        item.x === snakeHeadPosition.x &&
        item.y === snakeHeadPosition.y
    )
  ) {
    gameOver();
  }
};

const checkCollisionFoodWithSnake = () => {
  /*for (let i = 0; i < foodsPositions.length; i++) {
    if (
      foodsPositions[i].x === snakeHeadPosition.x &&
      foodsPositions[i].y === snakeHeadPosition.y
    ) {
      playingField.removeChild(food[i]);
      delete food[i];
      delete foodsPositions[i];
      spawnFood();
      spawnOneSnakeCell(snakeHeadPosition.y, snakeHeadPosition.x);
    }
  }*/
  foodsPositions.forEach((item, index) =>
    item.x === snakeHeadPosition.x && item.y === snakeHeadPosition.y
      ? playingField.removeChild(food[index]) &&
        food.slice(index, 1) &&
        foodsPositions.slice(index, 1) &&
        spawnFood() &&
        spawnOneSnakeCell(snakeHeadPosition.y, snakeHeadPosition.x)
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

const checkFieldBorder = () => {
  if (snakeHeadPosition.x === playingFieldSize.width) {
    snakeHeadPosition.x = 0;
  } else if (snakeHeadPosition.x < 0) {
    snakeHeadPosition.x = playingFieldSize.width;
  }
  if (snakeHeadPosition.y === playingFieldSize.height) {
    snakeHeadPosition.y = 0;
  } else if (snakeHeadPosition.y < 0) {
    snakeHeadPosition.y = playingFieldSize.height;
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
  checkCollisionSnake();
  checkCollisionFoodWithSnake();
  checkFieldBorder();
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

const removeAllNodes = () => {
  while (playingField.firstChild) {
    playingField.firstChild.remove();
  }
};

const gameOver = () => {
  deleteMainLoop();
  alert(`Поражение, счет: ${scoreData}`);
  removeAllNodes();
  scoreData = -1;
  snakeStartSize = 5;
  snakePiecePositions = [];
  snakePiece = [];
  snakeHeadPosition = {
    x: playingFieldSize.width / 2,
    y: playingFieldSize.height / 2,
  };
  foodPosition = {
    x: null,
    y: null,
  };
  moveDirection = "left";

  food = [];
  foodsPositions = [];

  isGameOver = false;
  isGamePlayed = false;
  mainAnimationFrame = null;
  playIcon.src = "icons/play.svg";

  if (scoreData > localStorage.getItem("recordScore")) {
    localStorage.setItem("recordScore", scoreData);
    getRecordScore();
  }
};

const gameStart = () => {
  if (isGamePlayed) {
    playIcon.src = "icons/play.svg";
    alert("pause");
    deleteMainLoop();
    isGamePlayed = false;
  } else {
    playIcon.src = "icons/pause.svg";
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
getRecordScore();
