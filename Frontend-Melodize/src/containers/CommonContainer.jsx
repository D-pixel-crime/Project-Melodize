import { useContext, useLayoutEffect, useRef, useState } from "react";
import { Howl, Howler } from "howler";
import { useNavigate } from "react-router-dom";
import TextWithHover from "../components/shared/TextWithHover";
import { useCookies } from "react-cookie";
import { songContext } from "../contexts/songContext";
import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react";
import homePageLogo from "../assets/melodizeLogo.svg";
import { useLocation } from "react-router-dom";
import CreatePlaylistModal from "../modals/createPlaylistModal";
import AddSongToPlaylist from "../modals/AddSongToPlaylistModal";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

const CommonContainer = ({ children }) => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const [cookie, setCookie] = useCookies(["token", "username", "userId"]);
  const [openCreatePlaylistModal, setOpenCreatePlaylistModal] = useState(false);
  const [addPlaylistModalOpen, setAddPlaylistModelOpen] = useState(false);

  const {
    currentSong,
    setCurrentSong,
    isPaused,
    setIsPaused,
    playedSong,
    setPlayedSong,
  } = useContext(songContext);

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!currentSong) return;

    changeSong(currentSong.track);
  }, [currentSong && currentSong.track]);

  const playSound = () => {
    if (!playedSong) return;

    playedSong.play();
  };

  const changeSong = (trackURL) => {
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

  const togglePlaySound = () => {
    if (isPaused) {
      playSound();
    } else {
      playedSong.pause();
    }
    setIsPaused(!isPaused);
  };

  return (
    <div className="h-full w-full flex flex-col">
      {openCreatePlaylistModal && (
        <CreatePlaylistModal
          setOpenCreatePlaylistModal={setOpenCreatePlaylistModal}
        />
      )}
      {addPlaylistModalOpen && (
        <AddSongToPlaylist setAddPlaylistModelOpen={setAddPlaylistModelOpen} />
      )}
      <div
        className="w-full flex"
        style={{ height: currentSong ? "90%" : "100%" }}
      >
        <div className="h-full w-5/6">
          <div className="navbar w-full flex justify-start">
            <div></div>
            <div
              className={
                !cookie.token
                  ? "flex w-2/5 items-center text-lg flex-row-reverse justify-end"
                  : "flex w-3/5 items-center text-lg flex-row-reverse justify-end"
              }
            >
              <div
                className={
                  !cookie.token
                    ? "flex w-3/5 items-center px-4 justify-around"
                    : "flex w-2/5 items-center px-4 justify-around"
                }
              >
                <TextWithHover text={"Premium"} />
                <TextWithHover text={"Support"} />
                <TextWithHover text={"Download"} />
              </div>
              {!cookie.token ? (
                <div className="flex flex-row-reverse w-2/5 items-center px-3 text-gray-400 justify-evenly border-r-2 border-white">
                  <div
                    className="navbar-text hover:text-cyan-400 hover:underline"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Sign Up
                  </div>
                  <div
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="navbar-text rounded-full p-1.5 border-2 border-lime-400 bg-lime-400 text-black hover:underline"
                  >
                    Log In
                  </div>
                </div>
              ) : (
                <div className="flex flex-row-reverse w-2/5 items-center px-3 text-gray-400 justify-evenly border-r-2 border-white">
                  <div
                    className="navbar-text hover:text-pink-500"
                    onClick={() => {
                      navigate("/uploadSong");
                    }}
                  >
                    Upload Song
                  </div>
                  <div className="rounded-lg p-1.5 border-2 border-cyan-500 bg-transparent text-cyan-500 hover:cursor-pointer">
                    {cookie.username}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="content w-full p-8 overflow-auto">{children}</div>
        </div>
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
      {currentSong ? (
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
            <div>
              <Icon
                icon="material-symbols:playlist-add-rounded"
                className="text-gray-400 hover:text-white cursor-pointer text-2xl mx-1 hover:scale-110"
                onClick={() => {
                  setAddPlaylistModelOpen(true);
                }}
              />
            </div>
            <div>
              <Icon
                icon="icon-park-outline:like"
                className="text-gray-400 hover:text-white cursor-pointer text-2xl mx-1 hover:scale-110"
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default CommonContainer;
