import { state } from "./state.mjs";

/**
 * Check if the fish is still alive
 * if not display the game over screen
 */
export const checkFishHealth = () => {
  if (state.fish.life <= 0) {
    const gameOverElement = document.querySelector("#game-over");
    gameOverElement.style.display = "flex";
    gameOverElement.innerHTML = `<h1>GAME OVER</h1><h2>score</h2><h2><span>${state.score}</span></h2><h2>Refresh to try again</h2>`;
    return false;
  }
  return true;
};

/**
 * Check if the bounding box of the fish collide with the specified bounding box
 * @param {number} startX
 * @param {number} endX
 * @param {number} startY
 * @param {number} endY
 * @returns boolean - true if it collide otherwise false
 */
export const checkFishCollision = (startX, endX, startY, endY) => {
  return (
    endX > state.fish.position.x &&
    startX < state.fish.position.x + state.fish.size.x &&
    endY > state.fish.position.y &&
    startY < state.fish.position.y + state.fish.size.y
  );
};

/**
 * Check if the fish is still in the window, if not reset its position to the opposite side
 */
const checkFishInWindowBounds = () => {
  if (state.fish.position.x < 0 - state.fish.size.x) {
    state.fish.position.x = window.innerWidth;
  }
  if (state.fish.position.x > window.innerWidth) {
    state.fish.position.x = 0 - state.fish.size.x;
  }
  if (state.fish.position.y < 0 - state.fish.size.y) {
    state.fish.position.y = window.innerHeight;
  }
  if (state.fish.position.y > window.innerHeight) {
    state.fish.position.y = 0 - state.fish.size.y;
  }
};

/**
 * Used to simplify reading in the move function bellow
 * @param {*} x
 * @param {*} y
 */
export const setDirections = (x, y) => {
  state.fish.direction.x = x;
  state.fish.direction.y = y;
  state.fish.lastDirection.x = x;
  state.fish.lastDirection.y = y;
};

/**
 * moves the fish around based on true/false conditions
 * @param {HTMLDivElement} fishElement
 */
export const moveFish = (fishElement) => {
  /**
   * Group state and active actions for easier reading
   */
  const move = {
    left:
      state.pressedKeys.has("arrowleft") ||
      state.pressedKeys.has("a") ||
      state.pressedKeys.has("q"),
    right: state.pressedKeys.has("arrowright") || state.pressedKeys.has("d"),
    up:
      state.pressedKeys.has("arrowup") ||
      state.pressedKeys.has("w") ||
      state.pressedKeys.has("z"),
    down: state.pressedKeys.has("arrowdown") || state.pressedKeys.has("s"),
    boost: state.pressedKeys.has("shift"),
  };

  // reset
  const classes = [
    "up",
    "down",
    "right",
    "left-up",
    "left-down",
    "right-up",
    "right-down",
  ];

  state.fish.direction.x = 0;
  state.fish.direction.y = 0;

  // Honestly there might be a better way to do this....

  if (move.left && move.up) {
    setDirections(-1, -1);
    fishElement.classList.remove(...classes);
    fishElement.classList.add("left-up");
  } else if (move.left && move.down) {
    setDirections(-1, 1);
    fishElement.classList.remove(...classes);
    fishElement.classList.add("left-down");
  } else if (move.right && move.up) {
    setDirections(1, -1);
    fishElement.classList.remove(...classes);
    fishElement.classList.add("right-up");
  } else if (move.right && move.down) {
    setDirections(1, 1);
    fishElement.classList.remove(...classes);
    fishElement.classList.add("right-down");
  } else if (move.left) {
    setDirections(-1, 0);
    fishElement.classList.remove(...classes);
  } else if (move.right) {
    setDirections(1, 0);
    fishElement.classList.remove(...classes);
    fishElement.classList.add("right");
  } else if (move.up) {
    setDirections(0, -1);
    fishElement.classList.remove(...classes);
    fishElement.classList.add("up");
  } else if (move.down) {
    setDirections(0, 1);
    fishElement.classList.remove(...classes);
    fishElement.classList.add("down");
  }

  // Boost

  if (move.boost) {
    // Boost
    state.fish.speed = 10;
    fishElement.classList.add("boost");
  } else {
    state.fish.speed = 2;
    fishElement.classList.remove("boost");
  }

  // Bonus

  if (state.pressedKeys.has("control")) {
    fishElement.classList.add("teabag");
  } else {
    fishElement.classList.remove("teabag");
  }

  // update the global state
  state.fish.position.x += state.fish.direction.x * state.fish.speed;
  state.fish.position.y += state.fish.direction.y * state.fish.speed;

  // check if the fish is still in the window
  checkFishInWindowBounds();

  // move the fish
  fishElement.style.top = `${state.fish.position.y}px`;
  fishElement.style.left = `${state.fish.position.x}px`;
};
