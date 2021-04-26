export type MusicName =
  | "shallow"
  | "medium"
  | "deep"
  | "ink"
  | "mystery"
  | "shiny"
  | "consolation";

export default interface MusicLibrary {
  fadeOut(): Promise<void>;
  play(track: MusicName): void;
  stop(): void;
}
