/**
 * ![GLOBAL STATE]!
 * This global state contains all the informations of the currently running game
 * The state is directly mutated by the other functions
 */
export const state = {
  pressedKeys: new Set(), // Using a Set to ensure each key are unique
  score: 0,
  fish: {
    life: 100,
    speed: 2,
    size: {
      x: 150,
      y: 100,
    },
    position: {
      x: 200,
      y: window.innerHeight / 2,
    },
    direction: {
      x: 0, // -1 0 1
      y: 0, // -1 0 1
    },
    lastDirection: {
      // used for the projectiles since we need at least one direction
      x: -1, // 0
      y: 0, // -1 0 1
    },
  },
  projectiles: [], // pos{x, y}, dir
  enemies: [], // pos {x, y}, size: {x, y}, speed
};
