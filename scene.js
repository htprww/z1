import {Tank, Target} from './shapes';

export const scene = {
  init() {
    this.one = new Tank(100, 100);
    this.targets = [];
    const canvas = document.getElementById('canvas');
    const n = 200;
    for (let i = 0; i < n; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
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
