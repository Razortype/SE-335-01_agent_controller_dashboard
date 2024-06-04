import React from 'react'
import { BiLogOutCircle } from "react-icons/bi";
import useLogout from "../../../hooks/useLogout";

const Navbar = () => {
  const logout = useLogout();
  return (
    <div className='w-full px-5 sm:px-12 py-3 flex items-center justify-between bg-transparent'>
      <h1 className='text-white text-xl sm:text-3xl font-bold'>TALK2NOTE</h1>
      <button 
      onClick={logout}
      className='flex items-center gap-1 text-white text-base sm:text-lg bg-transparent font-semibold px-3 py-2 rounded-[50px]'>
        <BiLogOutCircle className='w-[1.3em] h-[1.3em] sm:w-[2.5em] sm:h-[2.5em] rounded-full py-[3px]  sm:py-[6px]'/>
      </button>
    </div>
  )
}

export default Navbar