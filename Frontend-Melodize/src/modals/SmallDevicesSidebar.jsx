import { Icon } from "@iconify/react/dist/iconify.js";
import IconText from "../components/shared/IconText.jsx";
import { useCookies } from "react-cookie";
import homePageLogo from "../assets/melodizeLogo.svg";
import { useLocation, useNavigate } from "react-router-dom";

const SmallDeviceSidebar = ({ setOpenSidebar, setOpenCreatePlaylistModal }) => {
  const [cookie, setCookie] = useCookies(["token", "username", "userId"]);
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  return (
    <div className="absolute w-screen h-screen bg-black z-40 bg-opacity-70 text-white">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex z-10 justify-end w-1/3 mb-2 text-3xl max-sm:w-5/6">
          <Icon
            icon="radix-icons:cross-2"
            onClick={() => {
              setOpenSidebar(false);
            }}
            className="cross-playlist"
          />
        </div>
        <div className="mobile-sidebar w-5/6 flex justify-between flex-col h-fit">
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
                setOpenCreatePlaylistModal={setOpenCreatePlaylistModal}
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
        </div>
      </div>
    </div>
  );
};
export default SmallDeviceSidebar;
