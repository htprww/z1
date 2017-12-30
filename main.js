import {scene} from './scene';
import {controller as input} from './controller';

window.input = input;
window.scene = scene;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
window.ctx = ctx;

const info = document.getElementById('info');


canvas.onmousemove = function(evt) {
  input.x = evt.offsetX;
  input.y = evt.offsetY;
}
canvas.onmousedown = function(evt) {
  scene.one.fire()
  // scene.one.moveTo(evt.offsetX, evt.offsetY);
}

document.onkeydown = function(evt) {
  evt.preventDefault();
  input.pressKey(evt.key);
}

document.onkeyup = function(evt) {
  evt.preventDefault();
  input.releaseKey(evt.key);
}

frame.time = Date.now();

scene.init();
window.requestAnimationFrame(frame);

function frame() {
  const now = Date.now();
  const last = frame.time;
  frame.time = now;
  const fps = Math.floor(1000 / (now - last));


  scene.update(input, fps);
  scene.cleanup(canvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  scene.render(ctx);

  // delay();

  const now2 = Date.now();
  const time = now2 - now;
  const real = Math.floor(1000 / time)
  info.textContent = `FPS: ${fps}, Real: ${real}, Time: ${time}`;

  window.requestAnimationFrame(frame);
}

function delay() {
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += Math.random();
  }
}
