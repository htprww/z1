import * as config from './config';

export class Trace {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    const destX = Math.random() * config.WIDTH;
    const destY = Math.random() * config.HEIGHT;

    this.destX = destX;
    this.destY = destY;

    this.duration = 300 + Math.floor(Math.random() * 1000);
    this.dx = (destX - x) / this.duration;
    this.dy = (destY - y) / this.duration;

  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.duration--;
  }
}
