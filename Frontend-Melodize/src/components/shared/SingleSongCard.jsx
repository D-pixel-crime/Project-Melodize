import { Icon } from "@iconify/react";
import { useContext } from "react";
import { songContext } from "../../contexts/songContext";
import animation from "../../Animation - 1711389074547.gif";

const SingleSongCard = ({ name, thumbnail, track, artist, id }) => {
  const { currentSong, setCurrentSong, isPaused, setIsPaused } =
    useContext(songContext);

  return (
    <div className="singleSongCard flex justify-between text-white mt-5 items-center p-2 rounded-lg px-4 hover:transition">
      <div className="flex">
        <div
          onClick={(event) => {
            event.preventDefault();
            setCurrentSong({ name, thumbnail, track, artist, _id: id });
            setIsPaused(false);
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
          <div className="flex items-center hover:underline cursor-pointer max-sm:text-xs">
            {name}
          </div>
          <div className="text-gray-400 text-sm flex items-center max-sm:text-xs hover:underline cursor-pointer">
            {artist.username}
          </div>
        </div>
      </div>
      <div className="flex items-center text-base">
        <div>
          {currentSong && currentSong._id === id && !isPaused ? (
            <img src={animation} alt="Music Playing" />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
export default SingleSongCard;
