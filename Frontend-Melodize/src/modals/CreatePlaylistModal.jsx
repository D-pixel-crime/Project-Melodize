import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import { useState } from "react";

const CreatePlaylistModal = ({ setOpenCreatePlaylistModal }) => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  return (
    <div className="absolute w-screen h-screen bg-black z-40 bg-opacity-70 text-white">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex justify-end w-1/3 mb-2 text-3xl">
          <Icon
            icon="radix-icons:cross-2"
            onClick={() => {
              setOpenCreatePlaylistModal(false);
            }}
            className="cross-playlist"
          />
        </div>
        <div className="text-white flex flex-col justify-center items-center w-1/3 border-2 border-white rounded-2xl px-4 py-6 bg-zinc-800">
          <div className="flex text-2xl items-center justify-between w-full border-b-2 border-gray-400 pb-1.5">
            <div>Create Playlist</div>
          </div>
          <div className="w-full">
            <TextInput
              label={"Name"}
              placeholder={"Enter Playlist Name"}
              value={name}
              setValue={setName}
            />
            <TextInput
              label={"Thumbnail"}
              placeholder={"Enter Thumbnail URL"}
              value={thumbnail}
              setValue={setThumbnail}
            />
          </div>
          <button className="text-black text-lg mt-10 hover:bg-cyan-400 rounded-full">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreatePlaylistModal;
