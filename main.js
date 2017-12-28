import * as Shapes from './shapes';


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.onmousemove = function(evt) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const t = new Shapes.Tank(100, 100);
  t.faceTo(evt.offsetX, evt.offsetY);
  t.draw(ctx);

}
