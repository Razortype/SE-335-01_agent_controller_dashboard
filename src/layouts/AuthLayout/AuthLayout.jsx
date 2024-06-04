import React from "react";
import { Outlet } from "react-router-dom";
import useProgressiveImg from "../../hooks/useProgressiveImg";
import Logo from '../../assets/logo.png';

const AuthLayout = () => {
  const [src, { blur }] = useProgressiveImg("assets/login_bg_down.png", "assets/login_bg.png");
  return (
    <div
      className="w-screen  relative bg-center h-screen flex flex-col items-center justify-center text-white transition-all"
    >
    <img
        src={src}
        style={{
          filter : blur ? 'blur(1px)' : '',
          WebkitFilter: blur ? 'blur(1px)' : ''
        }}
        className="w-full h-full absolute top-0 left-0 z-[-1] object-cover transition-all"
      />
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.4),rgba(255,255,255,.01))",
        }}
        className="rounded-[30px] relative border border-[#666666] flex flex-col gap-8 backdrop-blur-[8px] py-10 px-8"
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 shadow-lg w-24 h-24 rounded-full p-1 bg-[#1B0131]">
          <img src={Logo} className="mb-5 w-full h-full"/>
        </div>

        <Outlet/>
      </div>
    </div>
  );
};

export default AuthLayout;