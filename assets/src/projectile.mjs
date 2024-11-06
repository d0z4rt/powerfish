import { state } from "./state.mjs";
import { generateId } from "./utils.mjs";

/**
 * Shoot a projectile from the fish position
 * @param {HTMLDivElement} projectilesContainerElement
 */
export const createProjectile = (projectilesContainerElement) => {
  const projectileElement = document.createElement("div");

  projectileElement.className = "projectile";
  projectileElement.id = generateId(); // Generate a unique ID to be able to retrieve the DOM element

  projectilesContainerElement.append(projectileElement);

  // add the projectile to the global state
  state.projectiles.push({
    id: projectileElement.id,
    position: {
      x: state.fish.position.x + state.fish.size.x / 2,
      y: state.fish.position.y + state.fish.size.y / 2,
    },
    direction: { ...state.fish.lastDirection }, // creating a copy to avoid referencing the the fish direction
  });
};

/**
 * Check if the projectil is still visible
 * @param {*} projectile
 * @returns boolean
 */
export const checkProjectileInWindowBounds = (projectile) => {
  return (
    projectile.position.x < 0 ||
    projectile.position.x > window.innerWidth ||
    projectile.position.y < 0 ||
    projectile.position.y > window.innerHeight
  );
};

export const getProjectileElement = (id) => {
  const projectileElement = document.querySelector(`#${id}`);
  return projectileElement;
};

/**
 * Move the projectile based on its initial direction
 * If the projectile is out of bounds removes it and return false
 * @param {*} projectile
 * @returns boolean
 */
export const moveProjectile = (projectile, projectileElement) => {
  projectile.position.x += projectile.direction.x * 10;
  projectile.position.y += projectile.direction.y * 10;

  if (checkProjectileInWindowBounds(projectile)) {
    state.projectiles = state.projectiles.filter((p) => p.id !== projectile.id);
    projectileElement.remove();
    return false;
  }

  projectileElement.style.left = `${projectile.position.x}px`;
  projectileElement.style.top = `${projectile.position.y}px`;
  return true;
};

/**
 * Check if the projectile hit an enemy,
 * if true removes the projectile and decrease enemy life
 * @param {*} projectile
 * @param {*} projectileElement
 */
export const checkProjectileEnemyCollision = (
  projectile,
  projectileElement
) => {
  for (const enemy of state.enemies) {
    if (
      projectile.position.x + 5 > enemy.position.x &&
      projectile.position.x < enemy.position.x + enemy.size.x &&
      projectile.position.y + 5 > enemy.position.y &&
      projectile.position.y < enemy.position.y + enemy.size.y
    ) {
      enemy.life -= 50;
      state.projectiles = state.projectiles.filter(
        (p) => p.id !== projectile.id
      );
      projectileElement.remove();
    }
  }
};
