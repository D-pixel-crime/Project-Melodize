import { createContext } from "react";

export const pausingContext = createContext({
  isPaused: true,
  setIsPaused: (isPaused) => {},
});
