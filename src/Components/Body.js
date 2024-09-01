import React from "react";
import Sidebarr from "./SideBarr";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Body = () => {
  const isDark = useSelector((store) => store.app.isDark);
  console.log("Hey User! The cross origin resource sharing is not Allowed, so some features might not work like : search suggestions, debouncing, video searching, the suggestions buttons. I will fix these issues soon. Thank You");
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
