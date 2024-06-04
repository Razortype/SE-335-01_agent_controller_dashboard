import React from "react";

const AuthInput = ({ inputAttribs, isLoginInput, Icon }) => {

    return (
        <div className="flex items-center border-b text-sm sm:text-base border-[#B6B6B6] text-[#B6B6B6] focus-within:text-white focus-within:border-white transition-all">
          <input
            autoComplete="off"
            required
            className="bg-transparent w-full py-2 pr-1 outline-none placeholder-[#B6B6B6] focus-within:placeholder-white transition-all "
            {...inputAttribs}
          />
          {isLoginInput && <Icon className="w-[1.5em] h-[1.5em] " />}
        </div>
      );

}