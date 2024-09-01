import React from "react";
import Sidebarr from "./SideBarr";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Body = () => {
  const isDark = useSelector((store) => store.app.isDark);
  return (
    <div
      className={`${
        isDark
          ? "flex  "
          : "flex bg-black text-white"
      }`}
    >
      <Sidebarr />

      <Outlet />
    </div>
  );
};

export default Body;
