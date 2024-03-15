import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./output.css";
import "./custom.css";
import LoginComponent from "./routes/LoginComponent";
import SignupComponent from "./routes/SignupComponent";
import HomeComponent from "./routes/HomeComponent";
import UploadSong from "./routes/UploadSong";
import MyMusic from "./routes/MyMusic";
import { songContext } from "./contexts/songContext";
import { useState } from "react";
import SearchPage from "./routes/SearchPage";
import Library from "./routes/Library";
import IndependentLibrary from "./routes/IndependentLibrary";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [playedSong, setPlayedSong] = useState(null);
  const [independentPlaylist, setIndependentPlaylist] = useState(null);

  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        <songContext.Provider
          value={{
            currentSong,
            setCurrentSong,
            isPaused,
            setIsPaused,
            playedSong,
            setPlayedSong,
            independentPlaylist,
            setIndependentPlaylist,
          }}
        >
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="/uploadSong" element={<UploadSong />} />
            <Route path="/myMusic" element={<MyMusic />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/library" element={<Library />} />
            <Route path="/independent/:id" element={<IndependentLibrary />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </songContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
