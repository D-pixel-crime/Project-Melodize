import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./output.css";
import "./custom.css";
import LoginComponent from "./routes/LoginComponent";
import SignupComponent from "./routes/SignupComponent";
import HomeComponent from "./routes/HomeComponent";
import UploadSong from "./routes/UploadSong";
import MyMusic from "./routes/MyMusic";
import { songContext } from "./contexts/songContext";
import { pausingContext } from "./contexts/pausingContext";
import { useState } from "react";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        <pausingContext.Provider value={{ isPaused, setIsPaused }}>
          <songContext.Provider value={{ currentSong, setCurrentSong }}>
            <Routes>
              <Route path="/" element={<HomeComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/signup" element={<SignupComponent />} />
              <Route path="/uploadSong" element={<UploadSong />} />
              <Route path="/myMusic" element={<MyMusic />} />
              <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
          </songContext.Provider>
        </pausingContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
