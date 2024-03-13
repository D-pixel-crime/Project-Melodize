import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/shared/TextInput";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import CommonContainer from "../containers/CommonContainer";

const UploadSong = () => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token", "username"]);
  const [features, setFeatures] = useState({ fileName: "", url: "" });

  useEffect(() => {
    if (!cookie.token) navigate("/");
    console.log(window.cloudinary);
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
    console.log(res);
    navigate("/");
  };

  return (
    <CommonContainer>
      <div>
        <div className="text-white font-semibold text-5xl mb-2 border-b-2 border-gray-500 pb-2.5">
          Upload Your Song
        </div>
        <div className="px-4 mt-5">
          <div className="grid grid-cols-2 gap-8 px-8">
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
          <div className="px-8 my-8 flex justify-between">
            {features.fileName && features.url ? (
              <div className="rounded-md bg-yellow-400 px-2.5 py-2 overflow-x-hidden overflow-y-hidden cursor-default mr-4 flex justify-center items-center">
                <span className="underline">selected file</span>:
                {" " + features.fileName.substring(20)}...
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
                className="navbar-text ml-4 rounded-full bg-pink-400"
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
