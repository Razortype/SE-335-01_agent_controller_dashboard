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
        className="relative border border-accent bg-background flex flex-col gap-8 backdrop-blur-[8px] py-10 px-8"
      >
        <Outlet/>
      </div>
    </div>
  );
};

export default AuthLayout;