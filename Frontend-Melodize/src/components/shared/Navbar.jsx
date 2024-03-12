import { useNavigate } from "react-router-dom";
import TextWithHover from "./TextWithHover";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token", "username"]);

  return (
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
  );
};
export default Navbar;
