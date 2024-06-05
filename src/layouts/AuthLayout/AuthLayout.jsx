import React from "react";
import { Outlet } from "react-router-dom";
import useProgressiveImg from "../../hooks/useProgressiveImg";
import Logo from '../../assets/logo.png';

const AuthLayout = () => {
  const [src, { blur }] = useProgressiveImg("assets/login_bg_down.png", "assets/login_bg.png");
  return (
    <div
      className="bg-background w-screen relative h-screen flex flex-col items-center justify-center transition-all"
    >
      <div
        className="relative border-2 border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]
        bg-background2 flex flex-col gap-8 backdrop-blur-[8px] py-10 px-8"
      >
        <Outlet/>
      </div>
    </div>
  );
};

export default AuthLayout;