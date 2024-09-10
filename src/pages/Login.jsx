import { useState } from "react";
import MainInput from "../components/MainInput";
import { emailValidator, passwordValidator } from "../utils/Validator";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    // alert(`email: ${login.email}\nPassword: ${login.password}`);
    const isValidated = validateLogin();

    if (isValidated) {
      localStorage.setItem("email", login.email);
      nav("/");
    }
  };

  const validateLogin = () => {
    const isEmailValid = emailValidator(login.email);
    const isPasswordValid = passwordValidator(login.password);

    setError({
      email: isEmailValid,
      password: isPasswordValid,
    });

    if (isEmailValid === "" && isPasswordValid === "") {
      return true;
    }
    return false;
  };

  return (
    <div className="p-2 h-screen bg-black/70 flex flex-row gap-5">
      <img
        src="https://unsplash.it/1920/1080/?random"
        className="fixed top-0 left-0 w-screen h-screen object-cover -z-10"
      />
      <div className="bg-gray-400/10 backdrop-blur-lg rounded-3xl p-10 h-full lg:w-[30%] w-full flex justify-center items-center">
        <div className="w-full">
          <h1 className="font-medium text-4xl">Login</h1>
          <MainInput
            name="Email"
            value={login.email}
            error={error.email}
            type="email"
            setValue={(v) => setLogin((p) => ({ ...p, email: v }))}
          />
          <MainInput
            name="Password"
            value={login.password}
            error={error.password}
            type="password"
            setValue={(v) => setLogin((p) => ({ ...p, password: v }))}
          />
          <button
            onClick={handleLogin}
            className="w-full rounded-lg bg-slate-200 mt-6 p-2 text-slate-800 font-semibold hover:bg-slate-300 hover:text-slate-900"
          >
            LOGIN
          </button>
        </div>
      </div>
      <div className="items-center lg:flex hidden">
        <div>
          <h1 className="text-5xl font-semibold">Simple Budgeting App</h1>
          <p className="text-2xl mt-2">
            Like seriously, this web app is sooooooooo simple, but tricky.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
