import {Tank, Target} from './shapes';

const arr = [];
const n = 200;
for (let i = 0; i < n; i++) {
  arr.push(new Target());
}

export const scene = {
  one: new Tank(100, 100),
  targets: arr,

  update(mouse, fps) {
    this.one.update(input, fps);
    detect(this.one, this.targets);
  },

  cleanup() {
    this.one.cleanup();
    this.targets = this.targets.filter(function(t) {
      return t.alive;
    });
  },

  render(ctx) {
    this.one.render(ctx);
    this.targets.forEach(function(t) {
      t.render(ctx);
    });
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
