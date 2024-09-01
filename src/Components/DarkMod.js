import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../Utiliy/Store/AppSlice";

const DarkMod = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((store) => store.app.isDark);
  const darkHandler = () => {
    dispatch(setDarkMode());
  };
  return (
    <div>
      <button
        className={`${
          isDark
            ? "text-slate-200 bg-slate-800 px-2 rounded-xl mt-1 w-12"
            : "bg-slate-200 text-slate-800 px-2 rounded-xl mt-1 w-12"
        } `}
        onClick={darkHandler}
      >
        {!isDark ? "Light" : "Dark"}
      </button>
    </div>
  );
};

export default DarkMod;
