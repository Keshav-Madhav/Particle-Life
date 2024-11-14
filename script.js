import { getDeltaTime } from "./utils/deltaTime.js";
import { drawFPS } from "./utils/fpsDisplay.js";
import { Particle } from "./classes/ParticleClass.js";
import { screenToWorldCoordinates, zoomIn, zoomOut } from "./utils/utils.js";

/**
 * @type {Particle[]}
 */
const particlesArray = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

canvas.addEventListener('wheel', function(event) {
  event.preventDefault();
  if (event.deltaY < 0) {
    zoomIn();
  } else {
    zoomOut();
  }
});

canvas.addEventListener('mousemove', function(event) {
  camera.clientX = event.clientX;
  camera.clientY = event.clientY;
})

window.addEventListener('keydown', function(event) {
  if (keys.hasOwnProperty(event.key)) {
    keys[event.key] = true;
  } 
  if (event.key === 'w'){
    keys.ArrowUp = true;
  } 
  if (event.key === 's'){
    keys.ArrowDown = true;
  }
  if (event.key === 'a'){
    keys.ArrowLeft = true;
  }
  if (event.key === 'd'){
    keys.ArrowRight = true;
  }
  if (event.key === 'Shift') {
    camSpeed = 20;
  }
  if(event.key === 'Control'){
    camSpeed = 1;
  }

  if(event.key === 'm') {
    for (let i = 0; i < 10000; i++) {
      const screenX = Math.random() * canvas.width;
      const screenY = Math.random() * canvas.height;

      // Convert screen coordinates to world coordinates
      const { x: worldX, y: worldY } = screenToWorldCoordinates(screenX, screenY);

      //randomly choose a color from the colorPresets array
      const chosenColor = colorPresets[Math.floor(Math.random() * colorPresets.length)];

      const randomDx = Math.random() * 2 - 1;
      const randomDy = Math.random() * 2 - 1;

      particlesArray.push(new Particle({
        x: worldX,
        y: worldY,
        r: chosenColor.r,
        g: chosenColor.g,
        b: chosenColor.b,
        dx: randomDx,
        dy: randomDy,
        color: chosenColor.colorName,
      }));
    }
  }

  if(event.key === 'r') {
    particlesArray.length = 0;
    camera.x = 0;
    camera.y = 0;
    camera.zoom = 1;
  }
});

window.addEventListener('keyup', function(e) {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = false;
  }
  if (e.key === 'w'){
    keys.ArrowUp = false;
  }
  if (e.key === 's'){
    keys.ArrowDown = false;
  }
  if (e.key === 'a'){
    keys.ArrowLeft = false;
  }
  if (e.key === 'd'){
    keys.ArrowRight = false;
  }

  if (e.key === 'Shift') {
    camSpeed = 2;
  }
  if(e.key === 'Control'){
    camSpeed = 2;
  }
});

function drawStatistics() {
  //Draw the number of particles
  ctx.fillStyle = 'white';
  ctx.font = '13px Arial';
  ctx.fillText(`Particles: ${particlesArray.length}`, 10, 20);

  //Draw the zoom level
  ctx.fillText(`Zoom: ${camera.zoom}`, 10, 40);

  //Draw the camera position
  ctx.fillText(`Camera X: ${camera.x}`, 10, 60);
  ctx.fillText(`Camera Y: ${camera.y}`, 10, 80);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const fps = drawFPS(canvas.width, canvas.height, ctx);
  const deltaTime = getDeltaTime(120, fps.avgFps);

  if (keys.ArrowUp) camera.y -= (camSpeed / Math.sqrt(camera.zoom));
  if (keys.ArrowDown) camera.y += (camSpeed / Math.sqrt(camera.zoom));
  if (keys.ArrowLeft) camera.x -= (camSpeed / Math.sqrt(camera.zoom));
  if (keys.ArrowRight) camera.x += (camSpeed / Math.sqrt(camera.zoom));

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(camera.zoom, camera.zoom);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  //Draw and update particles
  particlesArray.forEach(particle => {
    particle.update(deltaTime);
    particle.draw(ctx);
  });

  ctx.restore();

  drawStatistics();

  requestAnimationFrame(draw);
}

draw();