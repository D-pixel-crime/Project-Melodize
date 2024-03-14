import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

const AddSongToPlaylistModal = ({ setAddPlaylistModelOpen }) => {
  const [playlists, setPlaylists] = useState([]);

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

  return (
    <div className="absolute w-screen h-screen bg-black z-40 bg-opacity-70 text-white">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex justify-end w-1/3 mb-2 text-3xl">
          <Icon
            icon="radix-icons:cross-2"
            onClick={() => {
              setAddPlaylistModelOpen(false);
            }}
            className="cross-playlist"
          />
        </div>
        <div className="text-white flex flex-col justify-center items-center w-1/3 border-2 border-white rounded-2xl px-4 py-6 bg-zinc-800">
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
                  >
                    <div
                      style={{ backgroundImage: `url(${element.thumbnail})` }}
                      className="h-10 w-10 bg-cover bg-no-repeat bg-center rounded-md"
                    ></div>
                    <div className="ml-4">{element.name}</div>
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
