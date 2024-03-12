import { Icon } from "@iconify/react";
import { useContext } from "react";
import { songContext } from "../../contexts/songContext";

const DownBar = ({ song, artist, togglePlaySound, isPaused }) => {
  const { currentSong, setCurrentSong } = useContext(songContext);

  return (
    <div className="music-down-bar flex text-white p-4">
      <div className="flex w-1/4 justify-start">
        <div
          className="songCardImage w-14 h-14 rounded-md mr-2 flex justify-center items-center"
          style={{
            backgroundImage: `url(${
              currentSong
                ? currentSong.thumbnail
                : "https://plus.unsplash.com/premium_photo-1679082307685-15e002fd917a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            })`,
          }}
        ></div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center hover:underline cursor-pointer">
            {currentSong ? currentSong.name : "Name"}
          </div>
          <div className="text-gray-400 text-sm flex items-center hover:underline cursor-pointer">
            {currentSong ? currentSong.artist.username : "Artist"}
          </div>
        </div>
      </div>
      <div className="w-2/4 h-full flex flex-col justify-center">
        <div className="flex text-2xl justify-center items-center">
          <Icon
            icon="ph:shuffle-bold"
            className="text-gray-400 hover:text-white cursor-pointer mr-8"
          />
          <Icon
            icon="fluent:previous-48-filled"
            className="text-gray-400 hover:text-white cursor-pointer"
          />
          <Icon
            icon={
              !isPaused
                ? "icon-park-solid:pause-one"
                : "icon-park-solid:play-one"
            }
            className="text-3xl text-gray-400 hover:text-white cursor-pointer mx-2.5"
            onClick={(event) => {
              event.preventDefault();
              togglePlaySound(
                currentSong
                  ? currentSong.track
                  : "https://res.cloudinary.com/dvbbutqoz/video/upload/v1710084501/tcnrjykx5woui5jnutss.mp3"
              );
            }}
          />
          <Icon
            icon="fluent:next-48-filled"
            className="text-gray-400 hover:text-white cursor-pointer"
          />
          <Icon
            icon="mingcute:repeat-line"
            className="text-gray-400 hover:text-white cursor-pointer ml-8"
          />
        </div>
        <div></div>
      </div>
      <div className="flex items-center w-1/4 text-base justify-end">
        <div>3:44</div>
        <div>...</div>
      </div>
    </div>
  );
};
export default DownBar;
