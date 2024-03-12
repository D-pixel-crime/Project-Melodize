import IconText from "./IconText";
import { Icon } from "@iconify/react";
import homePageLogo from "../../assets/melodizeLogo.svg";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const [cookie, setCookie] = useCookies(["token", "username"]);
  const currentPath = useLocation().pathname;

  return (
    <div className="sidebar flex justify-between flex-col h-full w-1/6">
      <div>
        <div
          className="logoHomePage w-full bg-inherit flex justify-center items-center"
          style={{ height: "27.5%" }}
        >
          <img src={homePageLogo} alt="Melodize Logo" />
        </div>
        <div className="mb-12">
          <IconText
            iconName={"material-symbols:home"}
            iconText={"Home"}
            active={currentPath === "/" ? true : false}
          />
          <IconText
            iconName={"ri:search-line"}
            iconText={"Search"}
            active={currentPath === "/search" ? true : false}
          />
          <IconText
            iconName={"fluent:library-16-regular"}
            iconText={"Library"}
            active={currentPath === "/library" ? true : false}
          />
        </div>
        <div className="mt-12">
          <IconText
            iconName={"ic:round-add-box"}
            iconText={"Create Playlist"}
            active={currentPath === "/createPlaylist" ? true : false}
          />
          <IconText
            iconName={"solar:chat-square-like-bold"}
            iconText={"Liked Songs"}
            active={currentPath === "/likedSongs" ? true : false}
          />
          {cookie.username ? (
            <IconText
              iconName={"mingcute:music-3-fill"}
              iconText={"My Music"}
              active={currentPath === "/myMusic" ? true : false}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex text-gray-400 justify-center items-center text-lg border-t-2 mx-2 py-4 border-gray-400">
        <div className="navbar-text flex hover:cursor-pointer justify-center items-center border-2 border-gray-400 w-2/5 p-1 rounded-full hover:border-white hover:text-white">
          <Icon icon="ph:globe" />
          <div className="ml-1">English</div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
