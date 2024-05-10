import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
} from "../utils/serverHelpers";
import { songContext } from "../contexts/songContext";

const AddSongToPlaylistModal = ({ setAddPlaylistModelOpen }) => {
  const [playlists, setPlaylists] = useState([]);
  const { currentSong, setCurrentSong } = useContext(songContext);

  useEffect(() => {
    const handleFetch = async () => {
      const res = await makeAuthenticatedGETRequest(
        "/playlist/get/myPlaylists"
      );
      if (res && !res.error) {
        setPlaylists(res.data);
      }
    };
    handleFetch();
  }, []);

  const handleAdd = async (playlistId) => {
    const res = await makeAuthenticatedPOSTRequest("/playlist/add/song", {
      playlistId,
      songId: currentSong._id,
    });
    if (res) {
      setAddPlaylistModelOpen(false);
    }
  };

  return (
    <div className="absolute w-screen h-screen bg-black z-50 bg-opacity-70 text-white">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex justify-end w-1/3 max-sm:w-5/6 mb-2 text-3xl">
          <Icon
            icon="radix-icons:cross-2"
            onClick={() => {
              setAddPlaylistModelOpen(false);
            }}
            className="cross-playlist"
          />
        </div>
        <div className="text-white flex flex-col justify-center items-center w-1/3 max-sm:w-5/6 border-2 border-white rounded-2xl px-4 py-6 bg-zinc-800">
          <div className="flex text-2xl items-center justify-between w-full border-b-2 border-gray-400 pb-1.5">
            <div>Select Playlist</div>
          </div>
          {playlists.length > 0 && (
            <div className="w-full">
              {playlists.map((element, index) => {
                return (
                  <div
                    className="flex items-center mt-4 mx-5 p-2 hover:bg-gray-700 rounded-lg cursor-pointer hover:scale-105 transition"
                    key={index}
                    onClick={(event) => {
                      event.preventDefault();
                      handleAdd(element._id);
                    }}
                  >
                    <div
                      style={{ backgroundImage: `url(${element.thumbnail})` }}
                      className="h-10 w-10 bg-cover bg-no-repeat bg-center rounded-md"
                    ></div>
                    <div className="ml-4 max-sm:text-xs">{element.name}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AddSongToPlaylistModal;
