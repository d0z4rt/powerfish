import { state } from "./src/state.mjs";
import { createBackground } from "./src/createBackground.mjs";
import { checkFishCollision, checkFishHealth, moveFish } from "./src/fish.mjs";
import {
  checkProjectileEnemyCollision,
  createProjectile,
  getProjectileElement,
  moveProjectile,
} from "./src/projectile.mjs";
import {
  checkEnemyLife,
  createEnemy,
  getEnemyElement,
  moveEnemy,
} from "./src/enemy.mjs";

let animationRef; // used to stop the loop (requestAnimationFrame)
const fish = document.querySelector("#powerfish");
const projectilesContainerEl = document.querySelector("#projectiles-container");
const enemiesContainerEl = document.querySelector("#enemies-container");
const fishLifeEl = document.querySelector("#fish-life");
const scoreEl = document.querySelector("#score");

/**
 * ![ EVENTS ]!
 */
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  // We need to use lowercase to prevent issues when using the shift key and moving at the same time
  if (state.pressedKeys.has(e.key.toLowerCase())) {
    // prevent event repeat
    return;
  }
  state.pressedKeys.add(e.key.toLowerCase());

  /**
   * Shoot projectiles on Spacebar press
   */
  if (e.key === " ") {
    createProjectile(projectilesContainerEl);
  }
});

document.addEventListener("keyup", (e) => {
  e.preventDefault();
  state.pressedKeys.delete(e.key.toLowerCase());
});

fish.addEventListener("mousedown", () => {
  fish.classList.add("bulles-visible");
  setTimeout(() => fish.classList.remove("bulles-visible"), 1000);
});

/**
 * ![ LOOP ]!
 */
const loop = () => {
  // move the fish around
  moveFish(fish);

  // Spawn enemies
  if (state.enemies.length < 5) {
    createEnemy();
  }

  // Move enemies and check collision with fish
  if (state.enemies.length > 0) {
    for (const enemy of state.enemies) {
      const enemyElement = getEnemyElement(enemy, enemiesContainerEl);

      // check if enemy is still alive
      const isEnemyAlive = checkEnemyLife(enemy, enemyElement);
      if (!isEnemyAlive) continue;

      moveEnemy(enemy, enemyElement);

      // fish collision detection
      const enemyCollideFish = checkFishCollision(
        enemy.position.x,
        enemy.position.x + enemy.size.x,
        enemy.position.y,
        enemy.position.y + enemy.size.y
      );

      if (enemyCollideFish) {
        state.fish.life--;
        // update UI
        fishLifeEl.innerText = state.fish.life;
      }
    }
  }

  // move projectiles and check collision with enemies
  if (state.projectiles.length > 0) {
    for (const projectile of state.projectiles) {
      const projectileElement = getProjectileElement(projectile.id);

      // Move the projectile and check if it still exists
      const isProjectileAlive = moveProjectile(projectile, projectileElement);
      if (!isProjectileAlive) continue;

      // Check if the projectile collide with an enemy
      checkProjectileEnemyCollision(projectile, projectileElement);
    }
  }

  scoreEl.innerHTML = state.score;

  const isFishAlive = checkFishHealth();

  if (!isFishAlive) {
    cancelAnimationFrame(animationRef);
  } else {
    animationRef = requestAnimationFrame(loop);
  }
};
animationRef = requestAnimationFrame(loop);

const bubblesContainerEl = document.querySelector("#bubbles-container");
createBackground(bubblesContainerEl);
