import { useCookies } from "react-cookie";
import CommonContainer from "../containers/CommonContainer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import PlaylistCard from "../components/shared/PlaylistCard";

const Library = () => {
  const [cookie, setCookie] = useCookies(["token", "username", "userId"]);
  const [playlistData, setPlaylistData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookie.token) navigate("/");
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await makeAuthenticatedGETRequest(
        "/playlist/get/myPlaylists"
      );
      if (res && !res.error) {
        setPlaylistData(res.data);
      }
    };
    fetchData();
  }, []);

  return (
    <CommonContainer>
      {playlistData ? (
        <div className="text-white mb-20">
          <div className="font-semibold text-4xl mb-2 border-b-2 border-gray-500 pb-2">
            My Library
          </div>
          <div className="w-full grid grid-cols-5 gap-4 mt-4 text-center">
            {playlistData.map((element, index) => {
              return (
                <div
                  className="cursor-pointer hover:underline"
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(`/independent/${element._id}`);
                  }}
                  key={index}
                >
                  <PlaylistCard
                    title={element.name}
                    description={""}
                    url={element.thumbnail}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </CommonContainer>
  );
};
export default Library;
