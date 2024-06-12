import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/AuthComponents/LoginForm/LoginForm";

const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <h3 className="font-bold text-white shadow shadow-accent p-1 text-xl sm:text-2xl mt-5">CYBERTRON</h3>
      </div>
      <LoginForm/>
      <div className="flex items-center justify-center text-gray-500 font-light text-xs sm:text-sm">
        Manager / Admin <span className="font-bold px-1 text-light-pink/60">ONLY</span> Dashboard
      </div>
    </>
  );
};

export default Login;