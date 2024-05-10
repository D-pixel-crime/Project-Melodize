import TextInput from "../components/shared/TextInput";
import loginPageLogo from "../assets/loginPageLogo.svg";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";

const LoginComponent = () => {
  useEffect(() => {
    if (cookie.token) {
      navigate("/");
      return;
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token", "username", "userId"]);

  const handleLogin = async () => {
    const formData = { email, password };
    const res = await makeUnauthenticatedPOSTRequest("/auth/login", formData);
    if (res && !res.error) {
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", res.token, { path: "/", expires: date });
      setCookie("username", res.username, { path: "/", expires: date });
      setCookie("userId", res._id, { path: "/", expires: date });
      alert("Successfully logged in.");
      navigate("/");
      return;
    }
    alert("Failed to log in.");
    return;
  };

  return (
    <div className="loginComponent w-full h-full flex flex-col items-center max-h-full">
      <div className="logo p-4 border-b-2 border-solid border-red-300 w-full flex justify-center">
        <img src={loginPageLogo} alt="melodize logo" width={"250px"} />
      </div>
      <div className="inputRegion w-4/12 py-8 flex flex-col items-center justify-evenly max-sm:w-5/6">
        <div className="font-bold mb-5 mt-1">
          To continue, login to Melodize.
        </div>
        <TextInput
          type={"text"}
          placeholder={"Enter your email-id"}
          label={"Email-id"}
          value={email}
          setValue={setEmail}
        />
        <TextInput
          type={"password"}
          placeholder={"Enter your password"}
          label={"Password"}
          value={password}
          setValue={setPassword}
        />
        <div className="w-full flex justify-end mt-5 pt-2">
          <button
            className="login-button font-semibold border-2 border-gray-200 rounded-3xl"
            onClick={(event) => {
              event.preventDefault();
              handleLogin();
            }}
          >
            LOG IN
          </button>
        </div>
        <div className="w-full border-b-2 border-gray-300 mt-8"></div>
        <div className="w-full flex flex-col items-center my-7 justify-between h-24">
          <h4 className="font-semibold">Don't have an account ?</h4>
          <button
            className="signup-button w-full font-semibold border-2 border-gray-200 text-lg rounded-3xl hover:bg-blue-400"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up For Melodize
          </button>
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;
