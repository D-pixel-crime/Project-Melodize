import SingleSongCard from "../components/shared/SingleSongCard.jsx";
import { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers.js";
import CommonContainer from "../containers/CommonContainer.jsx";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const MyMusic = () => {
  const [songData, setSongData] = useState([]);
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token", "username", "userId"]);

  useEffect(() => {
    const getData = async () => {
      const res = await makeAuthenticatedGETRequest("/song/get/mysongs");
      setSongData(res.data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (!cookie.token) navigate("/");
  });

  return (
    <CommonContainer>
      <div>
        <div className="text-pink-500 font-semibold text-5xl mb-2 border-b-2 border-gray-500 pb-2.5">
          My Music
        </div>
        <div className="px-8 py-1 max-[1024px]:px-2">
          <div>
            {songData.map((item, index) => {
              return (
                <SingleSongCard
                  id={item._id}
                  name={item.name}
                  thumbnail={item.thumbnail}
                  track={item.track}
                  artist={item.artist}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </CommonContainer>
  );
};
export default MyMusic;
