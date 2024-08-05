import React from 'react'
import Sidebarr from './SideBarr';
import { Outlet } from 'react-router-dom';


const Body = () => {
  return (
    <div className=" flex ">
        <Sidebarr />
        <Outlet />
    </div>
  )
}

export default Body;
