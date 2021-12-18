export default class Soon {
  handle: number;

  constructor(
    public name: string,
    public callback: () => void,
    started = false
  ) {
    this.handle = 0;
    if (started) this.start();
  }

  start(): void {
    if (!this.handle)
      this.handle = requestAnimationFrame(() => {
        this.callback();
        this.handle = 0;
      });
  }

  stop(): void {
    if (this.handle) {
      cancelAnimationFrame(this.handle);
      this.handle = 0;
    }
  }
}
