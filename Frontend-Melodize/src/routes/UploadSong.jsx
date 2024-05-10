import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/shared/TextInput.jsx";
import CloudinaryUpload from "../components/shared/CloudinaryUpload.jsx";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers.js";
import CommonContainer from "../containers/CommonContainer.jsx";

const UploadSong = () => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token", "username"]);
  const [features, setFeatures] = useState({ fileName: "", url: "" });

  useEffect(() => {
    if (!cookie.token) navigate("/");
  }, []);

  const [songName, setSongName] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleSubmit = async () => {
    let data = { name: songName, thumbnail, track: features.url };
    const res = await makeAuthenticatedPOSTRequest("/song/create", data);
    if (res.error) {
      alert("Could not upload song");
      return;
    }
    navigate("/");
  };

  return (
    <CommonContainer>
      <div>
        <div className="text-white font-semibold text-5xl max-sm:text-4xl mb-2 border-b-2 border-gray-500 pb-2.5">
          Upload Your Song
        </div>
        <div className="px-4 mt-5">
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-8 px-8 max-sm:px-2">
            <TextInput
              label={"Name"}
              placeholder={"Enter Song Name"}
              type={"text"}
              otherThanLoginPage={true}
              value={songName}
              setValue={setSongName}
            />
            <TextInput
              label={"Thumbnail"}
              placeholder={"Enter Song Thumbnail URL"}
              type={"text"}
              otherThanLoginPage={true}
              value={thumbnail}
              setValue={setThumbnail}
              // notAllowed={true}
            />
          </div>
          <div className="sm:px-8 my-8 flex max-sm:gap-4 justify-between">
            {features.fileName && features.url ? (
              <div className="rounded-md bg-yellow-400 max-sm:text-sm sm:px-2.5 sm:py-2 overflow-x-hidden overflow-y-hidden cursor-default sm:mr-4 flex-center">
                <span className="underline">
                  {`selected file: ${features.fileName.substring(0, 20)}`}...
                </span>
              </div>
            ) : (
              <CloudinaryUpload setValue={setFeatures} />
            )}
            <div>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
                className="navbar-text sm:ml-4 rounded-full bg-pink-400 max-sm:text-sm"
              >
                Upload Song
              </button>
            </div>
          </div>
        </div>
      </div>
    </CommonContainer>
  );
};
export default UploadSong;
