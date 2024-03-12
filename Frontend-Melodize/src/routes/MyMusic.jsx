import SingleSongCard from "../components/shared/SingleSongCard";
import { useContext, useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { Howl, Howler } from "howler";
import CommonContainer from "../containers/CommonContainer";

const MyMusic = () => {
  const [songData, setSongData] = useState([]);
  const [playedSong, setPlayedSong] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await makeAuthenticatedGETRequest("/song/get/mysongs");
      setSongData(...songData, res.data);
    };
    getData();
  }, []);

  const playSound = (trackURL) => {
    if (playedSong) {
      playedSong.stop();
    }
    let sound = new Howl({
      src: [trackURL],
      html5: true,
    });
    setPlayedSong(sound);
    sound.play();
  };

  const togglePlaySound = (trackURL) => {
    if (isPaused) {
      playSound(trackURL);
    } else {
      playedSong.pause();
    }
    setIsPaused(!isPaused);
  };

  return (
    <CommonContainer>
      <div>
        <div className="text-pink-500 font-semibold text-5xl mb-2 border-b-2 border-gray-500 pb-2.5">
          My Music
        </div>
        <div className="px-8 py-1">
          <div>
            {songData.map((item, index) => {
              return (
                <SingleSongCard
                  name={item.name}
                  thumbnail={item.thumbnail}
                  track={item.track}
                  artist={item.artist}
                  playSound={playSound}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </CommonContainer>
  );
};
export default MyMusic;
