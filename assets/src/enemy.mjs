import { state } from "./state.mjs";
import { generateId, generateRandomNumInRange } from "./utils.mjs";

/**
 * Add an enemy to the global state
 */
export const createEnemy = () => {
  const size = generateRandomNumInRange(50, 100);
  state.enemies.push({
    id: generateId(),
    speed: generateRandomNumInRange(2, 6),
    life: 100,
    position: {
      x: window.innerWidth,
      y: generateRandomNumInRange(0, window.innerHeight),
    },
    size: {
      x: size,
      y: size,
    },
  });
};

/**
 * Get the current enemy element by id,
 * if it doesn't exists create it
 * @param {*} id
 * @param {*} enemiesContainerElement
 */
export const getEnemyElement = (enemy, enemiesContainerElement) => {
  let enemyElement = document.querySelector(`#${enemy.id}`);
  if (!enemyElement) {
    enemyElement = document.createElement("div");
    enemyElement.className = "enemy";
    enemyElement.id = enemy.id;
    enemyElement.style.height = `${enemy.size.y}px`;
    enemyElement.style.width = `${enemy.size.x}px`;
    enemiesContainerElement.append(enemyElement);
  }
  return enemyElement;
};

/**
 * Check the life of the enemy,
 * remove it if life is < 0 and return false
 * @param {*} enemy
 * @param {*} enemyElement
 * @returns boolean
 */
export const checkEnemyLife = (enemy, enemyElement) => {
  if (enemy.life <= 0) {
    state.enemies = state.enemies.filter((p) => p.id !== enemy.id);
    enemyElement.remove();
    state.score++;
    return false;
  }
  // update ui
  enemyElement.innerHTML = enemy.life;
  return true;
};

/**
 * Move enemy on x axis
 * @param {*} enemy
 * @param {*} enemyElement
 */
export const moveEnemy = (enemy, enemyElement) => {
  enemy.position.x -= enemy.speed;

  // Check for out of bounds
  // only check on x since we don't move on y
  if (enemy.position.x < 0 - enemy.size.x) {
    enemy.position.x = window.innerWidth;
  }
  if (enemy.position.x > window.innerWidth) {
    enemy.position.x = 0 - enemy.size.x;
  }
  enemyElement.style.left = `${enemy.position.x}px`;
  enemyElement.style.top = `${enemy.position.y}px`;
};
