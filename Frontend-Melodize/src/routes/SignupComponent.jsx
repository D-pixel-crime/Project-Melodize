import TextInput from "../components/shared/TextInput.jsx";
import loginPageLogo from "../assets/loginPageLogo.svg";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers.js";
import { useNavigate } from "react-router-dom";

const SignupComponent = () => {
  useEffect(() => {
    if (cookie.token) {
      navigate("/");
      return;
    }
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cookie, setCookie] = useCookies(["token", "username", "userId"]);
  const navigate = useNavigate();

  const signUp = async () => {
    if (email !== confirmEmail) {
      alert("Email and Confirm-email not same, plz check again");
      return;
    }
    const formData = { username, email, password, firstName, lastName };
    const res = await makeUnauthenticatedPOSTRequest(
      "/auth/register",
      formData
    );
    if (res && !res.error) {
      let date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", res.token, {
        path: "/",
        expires: date,
      });
      setCookie("username", res.username, { path: "/", expires: date });
      setCookie("userId", res._id, { path: "/", expires: date });
      navigate("/");
      return;
    }
    alert("Something went wrong");
    return;
  };

  return (
    <div className="loginComponent w-full h-full flex flex-col items-center max-h-full">
      <div className="logo p-4 border-b-2 border-solid border-red-300 w-full flex justify-center">
        <img src={loginPageLogo} alt="melodize logo" width={"250px"} />
      </div>
      <div className="inputRegion w-4/12 py-8 flex flex-col items-center justify-evenly max-sm:w-5/6">
        <div
          className="font-black mb-7 mt-1 text-3xl"
          style={{ letterSpacing: "1px" }}
        >
          Signup for free to start listening
        </div>
        <TextInput
          type={"text"}
          placeholder={"Enter Your Username"}
          label={"Username"}
          value={username}
          setValue={setUsername}
        />
        <TextInput
          type={"email"}
          placeholder={"Enter your email-id"}
          label={"Email-id"}
          value={email}
          setValue={setEmail}
        />
        <TextInput
          type={"email"}
          placeholder={"Confirm your email"}
          label={"Enter your email again"}
          value={confirmEmail}
          setValue={setConfirmEmail}
        />
        <TextInput
          type={"password"}
          placeholder={"Enter a Strong Password"}
          label={"Password"}
          value={password}
          setValue={setPassword}
        />
        <div className="w-full flex max-sm:flex-col justify-between sm:space-x-4">
          <TextInput
            type={"text"}
            label={"First Name"}
            placeholder={"Enter Your First Name"}
            value={firstName}
            setValue={setFirstName}
          />
          <TextInput
            type={"text"}
            label={"Last Name"}
            placeholder={"Enter Your Last Name"}
            value={lastName}
            setValue={setLastName}
          />
        </div>
        <div className="w-full flex justify-center mt-7 pt-2">
          <button
            className="signup-button w-full font-semibold border-2 border-gray-200 rounded-3xl hover:bg-blue-400"
            style={{ transition: "0.5s" }}
            onClick={(event) => {
              event.preventDefault();
              signUp();
            }}
          >
            SIGN UP
          </button>
        </div>
        <div className="w-full border-b-2 border-gray-300 mt-8"></div>
        <div className="w-full flex flex-col items-center my-7 justify-between h-24">
          <h4 className="font-semibold">Already have an account?</h4>
          <button
            className="login-signupPage-button w-full font-semibold border-2 border-gray-200 text-lg rounded-3xl"
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in instead
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignupComponent;
