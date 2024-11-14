// getDeltaTime(targetFPS)
// 
// Purpose:
//   The getDeltaTime function calculates the delta time, representing the elapsed time between frames,
//   and normalizes it to match an expected target FPS (frames per second). This normalization allows 
//   the game to run at a consistent speed, regardless of actual device performance, as if it were 
//   running at the specified target FPS.


let lastTime = performance.now();

/**
 * Calculates the delta time between frames, normalized to match a target FPS or uses
 * the given FPS if provided. This allows for consistent game speed across devices 
 * with varying frame rates.
 *
 * @param {number} [targetFPS=60] - The desired frame rate to normalize against, or
 *                                   the actual frame rate if directly provided.
 *                                   Default is 60. For example, setting targetFPS to 120
 *                                   will make the game run as if it’s at 120 FPS, even on a slower device.
 * @param {number} [fps] - Optional actual frame rate of the game loop, which can bypass 
 *                         internal calculations if directly provided.
 *
 * @returns {number} - The normalized delta time in seconds, adjusted to simulate the game running
 *                     at the specified or provided FPS. This can be used to ensure consistent movement
 *                     and animations across devices.
 *
 * @example
 * function draw() {
 *   const deltaTime = getDeltaTime(120); // Normalize delta time to 120 FPS
 *
 *   object.x += object.velX * deltaTime;
 *   object.y += object.velY * deltaTime;
 *
 *   requestAnimationFrame(draw);
 * }
 * draw();
 */
function getDeltaTime(targetFPS = 60, fps = null) {
  let deltaTime;

  if (fps !== null) {
    // If fps is provided, calculate deltaTime based on the ratio of targetFPS to fps
    deltaTime = fps / targetFPS;
  } else {
    const currentTime = performance.now();
    deltaTime = (currentTime - lastTime) / 1000;

    // Calculate the target delta based on the expected FPS
    const targetDelta = 1 / targetFPS;

    // Normalize deltaTime to match the target FPS
    deltaTime = deltaTime / targetDelta;

    lastTime = currentTime;
  }

  // Cap deltaTime to avoid large jumps
  deltaTime = Math.min(deltaTime, 2); // Adjust this cap as needed

  return deltaTime;
}

export { getDeltaTime };