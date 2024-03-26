import { useState } from "react";
import TextInput from "../components/shared/TextInput";
import CommonContainer from "../containers/CommonContainer";
import SingleSongCard from "../components/shared/SingleSongCard";
import { Icon } from "@iconify/react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [songData, setSongData] = useState([]);
  const [ok, setOk] = useState("");

  const handleSearch = async () => {
    const res = await makeAuthenticatedGETRequest(
      `/song/get/songName/${query}`
    );
    if (res && !res.error) {
      setSongData(res.data);
      setOk(query);
    }
  };

  return (
    <CommonContainer>
      <div className="flex flex-col w-full h-full items-center">
        <div className="w-full flex flex-col justify-evenly items-end px-16">
          <TextInput
            label={"Search"}
            placeholder={"Enter Song You Want To Listen To"}
            value={query}
            setValue={setQuery}
            otherThanLoginPage={true}
            onKeyDown={(event) => {
              event.preventDefault();
              console.log(event.target.value);
              if (event.target.value === "enter") handleSearch();
            }}
          />
          <button
            className="h-full mb-1 mt-1.5 text-lg rounded-lg text-white bg-transparent border-1 border-white hover:bg-blue-400 hover:border-blue-400 hover:text-black"
            onClick={(event) => {
              event.preventDefault();
              handleSearch();
            }}
          >
            <Icon icon="ri:search-line" />
          </button>
        </div>
        {songData ? (
          <div className="w-full px-16 mt-4 max-[1024px]:px-4">
            {ok.length > 0 ? (
              <div className="text-gray-400 text-lg border-b-2 border-gray-400 mb-8">
                Showing Search Results for
                <span className="text-white"> "{ok}"</span> :
              </div>
            ) : (
              <></>
            )}
            <div>
              {songData.map((element, index) => {
                return (
                  <SingleSongCard
                    id={element._id}
                    name={element.name}
                    thumbnail={element.thumbnail}
                    track={element.track}
                    artist={element.artist}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </CommonContainer>
  );
};
export default SearchPage;
