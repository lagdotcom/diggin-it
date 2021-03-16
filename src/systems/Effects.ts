import Game from "../Game";
import Item from "../Item";

export default class Effects {
  effects: Item[];
  durations: number[];

  constructor(public g: Game) {
    this.effects = [];
    this.durations = [];

    g.on("effect", ({ effect, duration }) => {
      this.effects.push(effect);
      this.durations.push(duration);
    });
    g.on("tick", () => this.run());
  }

  run(): void {
    const remove: number[] = [];

    for (let i = 0; i < this.effects.length; i++) {
      const effect = this.effects[i];
      let duration = this.durations[i];
      duration--;

      if (duration < 1) {
        remove.unshift(i);
        this.g.removeItem(effect);
        continue;
      }

      this.durations[i] = duration;
    }

    remove.forEach((i) => {
      this.effects.splice(i, 1);
      this.durations.splice(i, 1);
    });
  }
}
