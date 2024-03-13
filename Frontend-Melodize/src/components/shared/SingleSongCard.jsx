import { Icon } from "@iconify/react";
import { useContext } from "react";
import { songContext } from "../../contexts/songContext";
import { pausingContext } from "../../contexts/pausingContext";

const SingleSongCard = ({ name, thumbnail, track, artist, playSound }) => {
  const { currentSong, setCurrentSong } = useContext(songContext);
  const { isPaused, setIsPaused } = useContext(pausingContext);

  return (
    <div className="singleSongCard flex justify-between text-white mt-5 items-center p-2 rounded-lg px-4">
      <div className="flex">
        <div
          onClick={(event) => {
            event.preventDefault();
            setCurrentSong({ name, thumbnail, track, artist });
            setIsPaused(false);
            playSound(track);
          }}
          className="songCardImage w-12 h-12 rounded-md mr-2 flex justify-center items-center"
          style={{
            backgroundImage: `url(${
              thumbnail ||
              "https://plus.unsplash.com/premium_photo-1679082307685-15e002fd917a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            })`,
          }}
        >
          <Icon
            icon={
              currentSong
                ? !isPaused && currentSong.name === name
                  ? "gridicons:pause"
                  : "gridicons:play"
                : "gridicons:play"
            }
            className="size-6 cursor-pointer hover:opacity-75"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center hover:underline cursor-pointer">
            {name}
          </div>
          <div className="text-gray-400 text-sm flex items-center hover:underline cursor-pointer">
            {artist.username}
          </div>
        </div>
      </div>
      <div className="flex items-center text-base">
        <div>3:44</div>
        <div>...</div>
      </div>
    </div>
  );
};
export default SingleSongCard;
