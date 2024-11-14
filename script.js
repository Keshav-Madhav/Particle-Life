import { getDeltaTime } from "./utils/deltaTime.js";
import { drawFPS } from "./utils/fpsDisplay.js";
import { Particle } from "./classes/ParticleClass.js";

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

window.addEventListener('click', (e) => {    
  for (let i = 0; i < 10000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    //randomly choose a color from the colorPresets array
    const chosenColor = colorPresets[Math.floor(Math.random() * colorPresets.length)];

    particlesArray.push(new Particle({
      x,
      y,
      r: chosenColor.r,
      g: chosenColor.g,
      b: chosenColor.b,
      color: chosenColor.colorName,
    }));
  }
});

function drawStatistics() {
  //Draw the number of particles
  ctx.fillStyle = 'white';
  ctx.font = '14px Arial';
  ctx.fillText(`Particles: ${particlesArray.length}`, 10, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const fps = drawFPS(canvas.width, canvas.height, ctx);
  const deltaTime = getDeltaTime(120, fps.avgFps);

  //Draw and update particles
  particlesArray.forEach(particle => {
    particle.update(deltaTime);
    particle.draw(ctx);
  });

  drawStatistics();

  requestAnimationFrame(draw);
}

draw();