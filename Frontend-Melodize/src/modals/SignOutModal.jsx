import { useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { songContext } from "../contexts/songContext";

const SignOutModal = ({ setSignoutModalOpen, date, changeSong }) => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token", "username", "userId"]);
  const { currentSong, setCurrentSong } = useContext(songContext);

  return (
    <div className="absolute w-screen h-screen bg-white z-50 bg-opacity-90 text-white">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="text-white flex flex-col justify-center items-center w-1/3 max-sm:w-5/6 shadow-md shadow-black rounded-2xl px-4 py-6 bg-zinc-800">
          <div className="flex text-2xl max-sm:text-xl items-center justify-center w-full border-b-2 border-gray-400 pb-1.5">
            <div>Do You Want To Signout?</div>
          </div>
          <div className="text-white mt-5 flex justify-between w-full">
            <button
              className="border border-white signoutModal-buttons hover:bg-green-600"
              onClick={(event) => {
                event.preventDefault();
                setSignoutModalOpen(false);
              }}
            >
              Close
            </button>
            <button
              className="border border-white signoutModal-buttons hover:bg-red-600"
              onClick={(event) => {
                event.preventDefault();
                setCookie("token", "", { path: "/", expires: date });
                setCookie("username", "", {
                  path: "/",
                  expires: date,
                });
                setCookie("userId", "", { path: "/", expires: date });
                navigate("/login");
                setCurrentSong(null);
                changeSong("");
                setSignoutModalOpen(false);
              }}
            >
              Signout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignOutModal;
