export type MusicName =
  | "shallow"
  | "medium"
  | "deep"
  | "ink"
  | "mystery"
  | "shiny"
  | "consolation"
  | "vault"
  | "vaultComplete";

export default interface MusicLibrary {
  playing?: MusicName;

  fadeOut(): Promise<void>;
  play(track: MusicName): void;
  stop(): void;
}
