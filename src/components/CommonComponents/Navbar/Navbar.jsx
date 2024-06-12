import React, { useState } from 'react'
import { CiLogout } from "react-icons/ci";
import useLogout from "../../../hooks/useLogout";
import { useNavigate } from 'react-router-dom';
import Modal from '../../DashboardComponents/Modal/Modal';
import { SiAzuredataexplorer } from "react-icons/si";
import { Tooltip, Typography } from '@material-tailwind/react';

const Navbar = () => {

  const logout = useLogout();
  const toDashboard = location.state?.from?.pathname || "/dashboard";
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

  return (
    <div className='text-text w-full px-5 sm:px-12 sm:py-10 py-3 flex items-end justify-between bg-transparent'>
      <h1 className='ml-5 text-white text-xl sm:text-3xl font-bold'>CYBERTRON</h1>
      
      <div className='flex w-[230px] justify-between items-end'>
     
        <ul className='w-[150px] flex items-end justify-between'>
          <button 
          onClick={() => navigate(toDashboard, { replace: true })}
          className='font-bold hover:text-light-green transition-all text-pink'
          >
            Dashboard
          </button>
          <li className='line-through text-text/70'>Agents</li>
        </ul>

        <div className='flex row gap-2 '>

        <Tooltip
            content={<Typography color="white">Create Attack</Typography>}
            placement="bottom-end"
          >
            <button 
            onClick={() => setIsOpen(true)} 
            className='flex items-center gap-1 text-secondary text-base sm:text-lg bg-transparent font-semibold rounded-[50px]'>
              <SiAzuredataexplorer className='w-[1.3em] h-[1.3em] sm:w-[1.7em] sm:h-[1.7em] bg-light-pink rounded text-black py-[3px] sm:py-[6px] p-1 hover:border-accent hover:text-accent hover:bg-background2 transition-all' />
            </button>
          </Tooltip>

        <Tooltip
          content={<Typography color="white">Logout</Typography>}
          placement="bottom-end"
        >
          <button 
          onClick={logout}
          className='flex items-center gap-1 text-secondary text-base sm:text-lg bg-transparent font-semibold rounded-[50px]'>
            <CiLogout className='w-[1.3em] h-[1.3em] sm:w-[1.7em] sm:h-[1.7em] bg-light-blue rounded text-black py-[3px] sm:py-[6px] p-1 hover:border-accent hover:text-accent hover:bg-background2 transition-all'/>
          </button>
        </Tooltip>
        </div>
     
      </div>

      <Modal 
          isOpen={isOpen}
          setIsChanged={setIsChanged}
          onClose={() => setIsOpen(false)}
      ></Modal>
      
    </div>
  )
}

export default Navbar