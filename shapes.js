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

export class Tank {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.d = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.d);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(2 * this.r, 0);
    ctx.moveTo(this.r, 0);
    ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }

  faceTo(x, y) {
    this.d = Math.atan2(y - this.y, x - this.x);
  }
}
