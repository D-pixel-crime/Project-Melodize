import { createContext } from "react";

export const songContext = createContext({
  currentSong: null,
  setCurrentSong: (currentSong) => {},
  playedSong: null,
  setPlayedSong: (playedSound) => {},
  isPaused: true,
  setIsPaused: (isPaused) => {},
});
