import { force } from "../utils/force.js";
import { screenToWorldCoordinates } from "../utils/utils.js";

/**
 * A class representing a particle object to be drawn on the canvas
 * 
 * @param {Object} param0
 * @param {Number} param0.x
 * @param {Number} param0.y
 * @param {Number} param0.dx
 * @param {Number} param0.dy
 * @param {Number} param0.radius
 * @param {String} param0.color
 * @param {Number} param0.r
 * @param {Number} param0.g
 * @param {Number} param0.b
 * @example
 * const particle = new Particle({
 *  x: 100,
 *  y: 100,
 *  dx: 2,
 *  dy: 2,
 *  radius: 10,
 *  color: "white",
 *  r: 255,
 *  g: 255,
 *  b: 255
 * });
 */
class Particle {
  /**
   * @param {Object} param0
   * @param {Number} param0.x
   * @param {Number} param0.y
   * @param {Number} param0.dx
   * @param {Number} param0.dy
   * @param {Number} param0.radius
   * @param {Number} param0.hueIndex
   */
  constructor({
    x = 0,
    y = 0,
    dx = 0,
    dy = 0,
    radius = 2,
    hueIndex = 0,
  }) {
    this.positon = { x, y };
    this.velocity = { dx, dy };
    this.radius = radius;
    this.hueIndex = hueIndex;
    this.centralForceStrength = 0; // Small affinity towards the center
  }

  /**
   * Draw the particle on the canvas
   * @param {CanvasRenderingContext2D} context - The 2d rendering context from the canvas
   * @example
   * particle.draw(ctx);
  */
  draw(context) { 
    const hue = `hsl(${360 * (this.hueIndex/m)}, 100%, 50%)`;

    context.beginPath();
    context.arc(this.positon.x - camera.x, this.positon.y - camera.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = hue;
    context.fill();
    context.closePath();
  }
  
  calculateForce(other, matrix) {
    const dx = other.positon.x - this.positon.x;
    const dy = other.positon.y - this.positon.y;
    const distanceSqrd = dx * dx + dy * dy;

    if (distanceSqrd === 0) return { fx: 0, fy: 0 };

    const distance = Math.sqrt(distanceSqrd);

    // Calculate normalized distance
    const r = distance / normalizationRadius;
    const matrixValue = matrix[this.hueIndex][other.hueIndex];
    const forceMagnitude = force(r, matrixValue);

    // Calculate force components
    const fx = forceMagnitude * (dx / distance);
    const fy = forceMagnitude * (dy / distance);

    return { fx, fy };
  }

  applyForce(fx, fy, deltaTime) {
    // Acceleration based on force
    const ax = fx * 2;
    const ay = fy * 2;

    // Update velocity based on acceleration and deltaTime
    this.velocity.dx += ax * deltaTime;
    this.velocity.dy += ay * deltaTime;

    // Apply friction
    this.velocity.dx *= friction;
    this.velocity.dy *= friction;
  }

  update(particlesArray, matrix, deltaTime) {
    let totalFx = 0;
    let totalFy = 0;

    particlesArray.forEach(other => {
      if (other !== this) {
        const { fx, fy } = this.calculateForce(other, matrix);
        totalFx += fx;
        totalFy += fy;
      }
    });

    // Calculate the center of the canvas in world coordinates
    const {x, y} = screenToWorldCoordinates(canvas.width / 2, canvas.height / 2);

    // Calculate the directional vector towards the center
    const dx = x - this.positon.x;
    const dy = y - this.positon.y;
    // Calculate the square of the distance to the center
    const distanceToCenterSquared = dx * dx + dy * dy;

    // Apply a small force towards the center if the distance is non-zero
    if (distanceToCenterSquared > 0) {
      // Calculate the inverse distance without taking the square root
      const inverseDistance = 1 / Math.sqrt(distanceToCenterSquared); // Normalizing factor
      const centralFx = this.centralForceStrength * dx * inverseDistance;
      const centralFy = this.centralForceStrength * dy * inverseDistance;
      totalFx += centralFx;
      totalFy += centralFy;
    }

    this.applyForce(totalFx, totalFy, deltaTime);

    // Update position based on velocity
    this.positon.x += this.velocity.dx * deltaTime;
    this.positon.y += this.velocity.dy * deltaTime;
  }
}

export { Particle };