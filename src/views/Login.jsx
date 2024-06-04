import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/AuthComponents/LoginForm/LoginForm";

const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <h3 className="font-bold text-white text-xl sm:text-2xl mt-5">Log in</h3>
      </div>
      <LoginForm/>
      <div className="flex items-center justify-center font-light text-xs sm:text-sm">
        WAIT A MINUTE! DON'T HAVE AN ACCOUNT?
      </div>
    </>
  );
};

export default Login;