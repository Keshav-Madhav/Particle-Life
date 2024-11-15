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

const m = 6;
const beta = 0.2;
const friction = 0.3;
var normalizationRadius = (canvas.width / 10)
var matrix = [
  [1, 0.5, 0, 0, 0, 0],
  [0, 1, 0.5, 0, 0, 0],
  [0, 0, 1, 0.5, 0, 0],
  [0, 0, 0, 1, 0.5, 0],
  [0, 0, 0, 0, 1, 0.5],
  [0.5, 0, 0, 0, 0, 1]
]