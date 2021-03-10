export default class Soon {
  handle: number;

  constructor(public callback: () => void) {
    this.handle = 0;
  }

  start() {
    if (!this.handle)
      this.handle = requestAnimationFrame(() => {
        this.callback();
        this.handle = 0;
      });
  }

  stop() {
    if (this.handle) {
      cancelAnimationFrame(this.handle);
      this.handle = 0;
    }
  }
}
