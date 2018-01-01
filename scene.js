import {Tank, Target} from './shapes';
import * as config from './config';

export const scene = {
  init() {
    this.one = new Tank(100, 100);
    this.targets = [];
    const n = 50;
    for (let i = 0; i < n; i++) {
      let x = Math.random() * config.WIDTH;
      let y = Math.random() * config.HEIGHT;
      this.targets.push(new Target(x, y));
    }
  },

  update(mouse, fps) {
    this.one.update(input, fps);
    this.targets.forEach(t => t.update());
    detect(this.one, this.targets);
  },

  cleanup(canvas) {
    this.one.cleanup(canvas);
    this.targets = this.targets.filter(t => t.alive);
  },

  render(ctx) {
    this.targets.forEach(t => t.render(ctx));
    this.one.render(ctx);
  }
};

function detect(one, targets) {
  var bullets = one.bullets;
  bullets.forEach(function(b) {
    targets.forEach(function(t) {
      const dx = b.x - t.x;
      const dy = b.y - t.y;
      const ds = dx * dx + dy * dy;
      if (ds < 100) {
        t.alive = false;
        b.alive = false;
      }
    });
  });
}
