import { useParams } from "react-router-dom";
import CommonContainer from "../containers/CommonContainer";
import { Suspense, useContext, useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";
import { songContext } from "../contexts/songContext";
import Loading from "../components/shared/Loading";

const IndependentLibrary = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState();
  const [songs, setSongs] = useState([]);
  const { independentPlaylist, setIndependentPlaylist } =
    useContext(songContext);

  useEffect(() => {
    const handleFetch = async () => {
      const res = await makeAuthenticatedGETRequest(
        `/playlist/get/playlist/${id}`
      );
      setPlaylist(res.data);

      const temp = res.data.songs;
      for (const element of temp) {
        const eachSong = await makeAuthenticatedGETRequest(
          `/song/get/singleSong/${element}`
        );
        setSongs((prevSongs) => [...prevSongs, eachSong.data]);
        setIndependentPlaylist((prevList) => [...prevList, eachSong.data]);
      }
    };
    setIndependentPlaylist([]);
    handleFetch();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <CommonContainer>
        {playlist && songs.length > 0 ? (
          <div className="w-full h-full flex flex-col items-center text-white mb-5">
            <div className="flex max-sm:flex-col justify-center items-center border-b-2 border-gray-400 w-full pb-8 space-x-4">
              <div
                className="bg-cover bg-no-repeat bg-center h-48 w-52 rounded-lg"
                style={{ backgroundImage: `url(${playlist.thumbnail})` }}
              ></div>
              <div className="text-5xl max-sm:text-2xl max-lg:text-4xl">
                {playlist.name}
              </div>
            </div>
            <div className="w-full px-7 mt-2 max-[1024px]:px-2">
              {songs.map((element, index) => {
                return (
                  <SingleSongCard
                    name={element.name}
                    thumbnail={element.thumbnail}
                    artist={element.artist}
                    track={element.track}
                    key={index}
                    id={element._id}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </CommonContainer>
    </Suspense>
  );
};
export default IndependentLibrary;
