import { useLocation } from "react-router-dom";
import CommonContainer from "../containers/CommonContainer";
import { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

const IndependentLibrary = () => {
  const currentPath = useLocation().pathname.trim();
  const id = currentPath.substring(13);
  const [playlist, setPlaylist] = useState();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const handleFetch = async () => {
      const res = await makeAuthenticatedGETRequest(
        `/playlist/get/playlist/${id}`
      );
      setPlaylist(res.data);

      const songs = res.data.songs;
      for (const element of songs) {
        const { data } = await makeAuthenticatedGETRequest(
          `/song/get/singleSong/${element}`
        );
        setSongs(...songs, data);
      }
    };

    handleFetch();
  }, []);

  return <CommonContainer></CommonContainer>;
};
export default IndependentLibrary;
