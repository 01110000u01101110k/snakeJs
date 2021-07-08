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

let mobile = false;
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  mobile = true;
}

const getRecordScore = () => {};

const spawnFood = () => {};

const spawnSnake = () => {};

const gameOver = () => {};

const mainLoop = () => {};

const gameStart = () => {};

const gameLaunch = () => {};
