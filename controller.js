export const controller = {
  up: 0,
  down: 0,
  left: 0,
  right: 0,

  x: 0,
  y: 0,

  pressKey: pressKey,
  releaseKey: releaseKey
};

function pressKey(key) {
  switch (key) {
    case 'a':
    case 'ArrowLeft':
      input.left = 1;
      if (input.right === 1) {
        input.right = -1;
      }
      break;
    case 'd':
    case 'ArrowRight':
      input.right = 1;
      if (input.left === 1) {
        input.left = -1;
      }
      break;
    case 'w':
    case 'ArrowUp':
      input.up = 1;
      if (input.down === 1) {
        input.down = -1;
      }
      break;
    case 's':
    case 'ArrowDown':
      input.down = 1;
      if (input.up === 1) {
        input.up = -1;
      }
      break;
  }
}

function releaseKey(key) {
  switch (key) {
    case 'a':
    case 'ArrowLeft':
      input.left = 0;
      if (input.right === -1) {
        input.right = 1;
      }
      break;
    case 'd':
    case 'ArrowRight':
      input.right = 0;
      if (input.left === -1) {
        input.left = 1;
      }
      break;
    case 'w':
    case 'ArrowUp':
      input.up = 0;
      if (input.down === -1) {
        input.down = 1;
      }
      break;
    case 's':
    case 'ArrowDown':
      input.down = 0;
      if (input.up === -1) {
        input.up = 1;
      }
      break;
  }
}
