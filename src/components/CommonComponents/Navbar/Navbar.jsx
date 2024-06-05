import React from 'react'
import { CiLogout } from "react-icons/ci";
import useLogout from "../../../hooks/useLogout";

const Navbar = () => {
  const logout = useLogout();
  return (
    <div className='text-text w-full px-5 sm:px-12 sm:py-10 py-3 flex items-end justify-between bg-transparent'>
      <h1 className='text-white text-xl sm:text-3xl font-bold'>CYBERTRON</h1>
      
      <div className='flex w-[230px] justify-between items-center'>
     
        <ul className='w-[150px] flex items-center justify-between'>
          <li>Dashboard</li>
          <li>Agents</li>
        </ul>

        <button 
        onClick={logout}
        className='flex items-center gap-1 text-secondary text-base sm:text-lg bg-transparent font-semibold rounded-[50px]'>
          <CiLogout className='w-[1.3em] h-[1.3em] sm:w-[2em] sm:h-[2em] rounded-full py-[3px] sm:py-[6px] border border-secondary p-2 hover:border-accent hover:text-accent hover:bg-background2 transition-all'/>
        </button>
     
      </div>
      
    </div>
  )
}

export default Navbar