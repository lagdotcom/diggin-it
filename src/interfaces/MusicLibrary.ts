export type MusicName =
  | "shallow"
  | "medium"
  | "deep"
  | "ink"
  | "eleven"
  | "blot"
  | "mystery"
  | "shiny"
  | "consolation"
  | "winner"
  | "badWinner"
  | "vault"
  | "vaultComplete";

export default interface MusicLibrary {
  playing?: MusicName;

  fadeOut(): Promise<void>;
  play(track: MusicName): void;
  stop(): void;
}
