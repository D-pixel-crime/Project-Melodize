import { createContext } from "react";

export const songContext = createContext({
  currentSong: null,
  setCurrentSong: (currentSong) => {},
});
