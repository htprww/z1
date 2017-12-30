import {rgbToHsv, hsvToRgb} from './utils';

window.rgbToHsv = rgbToHsv;
window.hsvToRgb = hsvToRgb;

const FPS = 60;

class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Shape {
  constructor(p) {
    this.p = p;
  }

  draw(ctx) {
    console.log(`shape at (${this.p.x},${this.p.y})`);
  }
}

export class Circle extends Shape {
  constructor(p, r = 1) {
    super(p);
    this.r = r;
  }

  draw(ctx) {
    super.draw(ctx);
    console.log(`circle with r=${this.r}`);
  }
}

export class Rect extends Shape {
  constructor(input) {
    super(input.p);
    this.w = input.w;
    this.h = input.h;
  }
  draw(ctx) {
    ctx.strokeRect(this.p.x, this.p.y, this.w, this.h);
  }
}

export class Square extends Rect {
  constructor(x = 0, y = 0, w = 1) {
    super(x, y, w, w);
  }
}

class Bullet {
  constructor(t) {
    this.x = t.x + 2 * t.size * Math.cos(t.theta);
    this.y = t.y + 2 * t.size * Math.sin(t.theta);

    this.size = 2;
    this.speed = 3;

    this.dx = t.dx / 2 + this.speed * Math.cos(t.theta);
    this.dy = t.dy / 2 + this.speed * Math.sin(t.theta);

    this.dmg = t.dmg;
  }

  update(fps) {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x + this.size, this.y);
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

export class Tank {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.theta = 0;

    this.size = 10;

    this.speed = 1;
    this.accel = 0.05;

    this.dx = 0;
    this.dy = 0;

    this.bullets = [];

    this.hp = 100;
    this.dmg = 10;
  }

  render(ctx) {
    ctx.save();
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 1;

    ctx.translate(this.x, this.y);
    ctx.rotate(this.theta);
    ctx.beginPath();
    ctx.moveTo(2 * this.size, 0);
    ctx.lineTo(this.size, 0);
    ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
    ctx.stroke();

    const green = rgbToHsv(0, 255, 0);
    const red = rgbToHsv(255, 0, 0);
    const ratio = this.hp / 100;
    const mix = green[0] * ratio;
    const color = hsvToRgb(mix, 1, 1);
    // ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    ctx.lineWidth = 4;
    const r = this.size - 4;
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.arc(0, 0, r, 0, 2 * Math.PI * ratio);
    ctx.stroke();

    ctx.restore();

    this.bullets.forEach(function(b) {
      b.render(ctx);
    });
  }

  faceTo(x, y) {
    this.theta = Math.atan2(y - this.y, x - this.x);
  }

  moveTo(x, y) {
    this.destX = x;
    this.destY = y;

    const dx = x - this.x;
    const dy = y - this.y;
    const d = Math.sqrt(dx * dx + dy * dy);

    const ds = this.speed / FPS;
    this.dx = ds * dx /d;
    this.dy = ds * dy / d;
  }

  fire() {
    this.bullets.push(new Bullet(this));
  }

  update(input, fps) {
    // console.log(`${this.dx} ${this.dy}`);

    this.faceTo(input.x, input.y);

    const acc = this.accel;
    const isqrt2 = 1 / Math.sqrt(2);

    let ax = 0;
    let ay = 0;
    if (input.right === 1) {
      if (input.up === 1 || input.down === 1) {
        ax = acc * isqrt2;
      } else {
        ax = acc;
      }
    }
    if (input.left === 1) {
      if (input.up === 1 || input.down === 1) {
        ax = -acc * isqrt2;
      } else {
        ax = -acc;
      }
    }
    if (input.down === 1) {
      if (input.left === 1 || input.right === 1) {
        ay = acc * isqrt2;
      } else {
        ay = acc;
      }
    }
    if (input.up === 1) {
      if (input.left === 1 || input.right === 1) {
        ay = -acc * isqrt2;
      } else {
        ay = -acc;
      }
    }

    let dx = 0;
    if (ax === 0) {
      if (this.dx > 0) {
        dx = this.dx - acc / 4;
        dx = Math.max(dx, 0);
      } else if (this.dx < 0) {
        dx = this.dx + acc / 4;
        dx = Math.min(dx, 0);
      }
    } else {
      dx = this.dx + ax;
    }

    let dy = 0;
    if (ay === 0) {
      if (this.dy > 0) {
        dy = this.dy - acc / 4;
        dy = Math.max(dy, 0);
      } else if (this.dy < 0) {
        dy = this.dy + acc / 4;
        dy = Math.min(dy, 0);
      }
    } else {
      dy = this.dy + ay;
    }

    const ds = Math.sqrt(dx * dx + dy * dy);

    if (ds > this.speed) {
      this.dx = dx * this.speed / ds;
      this.dy = dy * this.speed / ds;
    } else {
      this.dx = dx;
      this.dy = dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    const canvas = document.getElementById('canvas');
    const min = this.size;
    const max = canvas.width - this.size;
    if (this.x < min) {
      this.x = min;
    } else if (this.x > max) {
      this.x = max;
    }
    if (this.y < min) {
      this.y = min;
    } else if (this.y > max) {
      this.y = max;
    }

    this.bullets.forEach(function(b) {
      b.update(fps);
    });

    this.bullets = this.bullets.filter(function(b) {
      const canvas = document.getElementById('canvas');
      return b.x > 0 && b.x < canvas.width &&
      b.y > 0 && b.y < canvas.height;
    });
  }
}
