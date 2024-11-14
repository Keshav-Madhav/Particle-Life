
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
   * @param {String} param0.color
   * @param {Number} param0.r
   * @param {Number} param0.g
   * @param {Number} param0.b
   */
  constructor({
    x = 0,
    y = 0,
    dx = 0,
    dy = 0,
    radius = 2,
    color = "white",
    r = 255,
    g = 255,
    b = 255
  }) {
    this.positon = { x, y };
    this.velocity = { dx, dy };
    this.acceleration = { x: 0, y: 0 };
    this.radius = radius;
    this.colorProfile = {
      name: color,
      r,
      g,
      b,
    }
  }

  /**
   * Draw the particle on the canvas
   * @param {CanvasRenderingContext2D} context - The 2d rendering context from the canvas
   * @example
   * particle.draw(ctx);
  */
  draw(context) { 
    const color = `rgb(${this.colorProfile.r}, ${this.colorProfile.g}, ${this.colorProfile.b})`;

    context.beginPath();
    context.arc(this.positon.x - camera.x, this.positon.y - camera.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
    context.closePath();
  }
  
  /**
   * Update the particle's position based on velocity and acceleration
   * @param {Number} deltaTime - The time between frames
   * @example
   * particle.update(deltaTime);
  */
  update(deltaTime) {
      // Ensure deltaTime is not zero to avoid division by zero issues
      const dt = deltaTime || 1;

      // calculate velocity based on acceleration
      const vx = this.velocity.dx + this.acceleration.x * dt;
      const vy = this.velocity.dy + this.acceleration.y * dt;

      // calculate position based on velocity
      this.positon.x += vx * dt;
      this.positon.y += vy * dt;

      // update velocity
      this.velocity.dx = vx;
      this.velocity.dy = vy;
  }    
}

export { Particle };