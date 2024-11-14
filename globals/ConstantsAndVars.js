/**
 * An array of color presets that are distinct and provide good contrast on a pure black background.
 * Each color is represented by its RGB components.
 *
 * @type {Array<{
*   colorName: string,   // The name of the color (e.g., 'cyan', 'magenta', etc.)
*   r: number,           // The red component of the color (0-255)
*   g: number,           // The green component of the color (0-255)
*   b: number            // The blue component of the color (0-255)
* }>}
*/
const colorPresets = [
  {
    colorName: 'orange',
    r: 255,
    g: 115,
    b: 0
  },
  {
    colorName: 'aqua',
    r: 0,
    g: 255,
    b: 247
  },
  {
    colorName: 'purple',
    r: 132,
    g: 0,
    b: 255
  },
  {
    colorName: 'lime',
    r: 144,
    g: 254,
    b: 0
  },
  {
    colorName: 'magenta',
    r: 255,
    g: 0,
    b: 161
  },
  {
    colorName: 'blue',
    r: 0,
    g: 21,
    b: 255
  }
];

/**
 * Camera object that holds the camera's position and zoom level.
 * @type {{x: number, y: number, zoom: number, clientX: number, clientY: number}}
*/
const camera = {
  x: 0,
  y: 0,
  zoom: 1,
  clientX: 0,
  clientY: 0
}
let zoomSpeed = 0.1;

/**
 * @typedef {Object} KeyState
 * @property {boolean} ArrowUp - State of the up arrow key
 * @property {boolean} ArrowDown - State of the down arrow key
 * @property {boolean} ArrowLeft - State of the left arrow key
 * @property {boolean} ArrowRight - State of the right arrow key
*/
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

var camSpeed = 2;