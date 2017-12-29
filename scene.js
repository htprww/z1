import {Tank} from './shapes'

export const scene = {
  one: new Tank(100, 100),
  enimies: [],

  update(mouse, fps) {
    this.one.update(input, fps);
  },

  cleanup() {
    this.one.cleanup();
  },

  render(ctx) {
    this.one.render(ctx);
  }
};
