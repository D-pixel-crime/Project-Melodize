import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const IconText = ({
  iconName,
  iconText,
  active,
  setOpenCreatePlaylistModal,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`flex hover:cursor-pointer w-full justify-center items-center text-2xl my-4 ${
        active ? "text-white" : "text-gray-400"
      } max-[1024px]:text-lg max-[768px]:text-sm max-sm:text-2xl`}
      onClick={(event) => {
        event.preventDefault();
        if (iconText === "Home") navigate("/");
        else if (iconText === "My Music") navigate("/myMusic");
        else if (iconText === "Search") navigate("/search");
        else if (iconText === "Library") navigate("/library");
        else if (iconText === "Create Playlist")
          setOpenCreatePlaylistModal(true);
      }}
    >
      <div className="mr-3 max-[1024px]:mr-1">
        <Icon icon={iconName} />
      </div>
      <div
        className={
          (iconText === "Liked Songs" && `hover:text-pink-400`) ||
          (iconText === "Create Playlist" && `hover:text-yellow-300`) ||
          (iconText === "My Music" && `hover:text-red-500`) ||
          `hover:text-purple-500`
        }
      >
        {iconText}
      </div>
    </div>
  );
};
export default IconText;
