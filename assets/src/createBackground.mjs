import { generateRandomNumInRange } from "./utils.mjs";

/**
 * Create the game background
 * @param {HTMLDivElement} container element to append the bubbles to
 * @param {number} bubblesNumber number of bubbles to generate
 */
export const createBackground = (container, bubblesNumber = 30) => {
  /**
   * Generate bubbles for the background
   */
  for (let i = 0; i < bubblesNumber; i++) {
    const bubbleEL = document.createElement("div");
    bubbleEL.classList.add("bubble");

    const size = generateRandomNumInRange(10, 40);

    bubbleEL.style = `width: ${size}px;
      								height: ${size}px;
      								left: ${generateRandomNumInRange(0, 90)}%;
      								bottom: -40px;
      								animation-delay: -${generateRandomNumInRange(-10, 30)}s;
      								animation-duration: ${generateRandomNumInRange(10, 30)}s;
      								opacity: ${generateRandomNumInRange(0.1, 0.8)};`;

    container.appendChild(bubbleEL);
  }
};
