import { getDeltaTime } from "./utils/deltaTime.js";
import { drawFPS } from "./utils/fpsDisplay.js";

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const fps = drawFPS(canvas.width, canvas.height, ctx);
    const deltaTime = getDeltaTime(120, fps.avgFps);

    requestAnimationFrame(draw);
}

draw();