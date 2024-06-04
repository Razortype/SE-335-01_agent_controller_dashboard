import React from 'react'
import Navbar from '../../components/CommonComponents/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='h-screen w-screen bg-home bg-cover pb-20 custom-scrollbar overflow-x-hidden'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default MainLayout