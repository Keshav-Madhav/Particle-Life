/**
 * Zoom in towards mouse position by increasing the zoom factor.
 */
const zoomIn = () => {
  // Store mouse position before zoom
  const mouseX = camera.clientX;
  const mouseY = camera.clientY;
  
  // Convert mouse position to world coordinates before zoom
  const worldPosBeforeZoom = screenToWorldCoordinates(mouseX, mouseY);
  
  camera.zoom = Math.max(Math.min(camera.zoom * (1 + zoomSpeed), 6), 0.01);
  camera.zoom = parseFloat(camera.zoom.toFixed(3));
  
  // Convert the same world position back to screen coordinates after zoom
  const screenPosAfterZoom = worldToScreenCoordinates(worldPosBeforeZoom.x, worldPosBeforeZoom.y);
  
  // Adjust camera position to keep mouse position fixed
  camera.x += (screenPosAfterZoom.x - mouseX) / camera.zoom;
  camera.y += (screenPosAfterZoom.y - mouseY) / camera.zoom;
}

/**
 * Zoom out from mouse position by decreasing the zoom factor.
 */
const zoomOut = () => {
  // Store mouse position before zoom
  const mouseX = camera.clientX;
  const mouseY = camera.clientY;
  
  // Convert mouse position to world coordinates before zoom
  const worldPosBeforeZoom = screenToWorldCoordinates(mouseX, mouseY);
  
  camera.zoom = Math.max(Math.min(camera.zoom * (1 - zoomSpeed), 6), 0.01);
  camera.zoom = parseFloat(camera.zoom.toFixed(3));
  
  // Convert the same world position back to screen coordinates after zoom
  const screenPosAfterZoom = worldToScreenCoordinates(worldPosBeforeZoom.x, worldPosBeforeZoom.y);
  
  // Adjust camera position to keep mouse position fixed
  camera.x += (screenPosAfterZoom.x - mouseX) / camera.zoom;
  camera.y += (screenPosAfterZoom.y - mouseY) / camera.zoom;
}

/**
 * Converts screen coordinates to world coordinates based on the current camera position and zoom level.
 * @param {number} screenX The x coordinate on the screen
 * @param {number} screenY The y coordinate on the screen
 * @returns {{x: number, y: number}} The world coordinates
 */
const screenToWorldCoordinates = (screenX, screenY) => {
  const worldX = (screenX - canvas.width / 2) / camera.zoom + camera.x + canvas.width / 2;
  const worldY = (screenY - canvas.height / 2) / camera.zoom + camera.y + canvas.height / 2;
  return { x: worldX, y: worldY };
}

/**
 * Converts world coordinates to screen coordinates based on the current camera position and zoom level.
 * @param {number} worldX The x coordinate in world space
 * @param {number} worldY The y coordinate in world space
 * @returns {{x: number, y: number}} The screen coordinates
 */
const worldToScreenCoordinates = (worldX, worldY) => {
  const screenX = ((worldX - canvas.width / 2 - camera.x) * camera.zoom) + canvas.width / 2;
  const screenY = ((worldY - canvas.height / 2 - camera.y) * camera.zoom) + canvas.height / 2;
  return { x: screenX, y: screenY };
}

/**
 * Generates a random matrix of size m x m with values between -1 and 1.
 * @param {number} m The size of the matrix
 * @returns {number[][]} A random matrix of size m x m
 */
function makeRandomMatrix(m) {
  const matrix = [];
  for (let i = 0; i < m; i++) {
    matrix.push([]);
    for (let j = 0; j < m; j++) {
      matrix[i].push(Math.random() * 2 - 1);
    }
  }
  return matrix;
}

export { zoomIn, zoomOut, screenToWorldCoordinates, worldToScreenCoordinates, makeRandomMatrix };