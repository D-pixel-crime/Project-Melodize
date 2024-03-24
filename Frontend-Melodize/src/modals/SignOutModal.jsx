import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const SignOutModal = ({ setSignoutModalOpen, date, changeSong }) => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token", "username", "userId"]);

  return (
    <div className="absolute w-screen h-screen bg-white z-40 bg-opacity-90 text-white">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="text-white flex flex-col justify-center items-center w-1/3 shadow-md shadow-black rounded-2xl px-4 py-6 bg-zinc-800">
          <div className="flex text-2xl items-center justify-center w-full border-b-2 border-gray-400 pb-1.5">
            <div>Do You Want To Signout?</div>
          </div>
          <div className="text-black mt-5 flex justify-between w-full">
            <button
              className="signoutModal-buttons hover:bg-green-600"
              onClick={(event) => {
                event.preventDefault();
                setSignoutModalOpen(false);
              }}
            >
              Close
            </button>
            <button
              className="signoutModal-buttons hover:bg-red-600"
              onClick={(event) => {
                event.preventDefault();
                setCookie("token", "", { path: "/", expires: date });
                setCookie("username", "", {
                  path: "/",
                  expires: date,
                });
                setCookie("userId", "", { path: "/", expires: date });
                navigate("/login");
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
