import React from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../Utiliy/Store/AppSlice";

const SearchSuggestion = ({ item, open }) => {
  const dispatch = useDispatch();
  const isDark = useSelector((store) => store.app.isDark);
  const screenWidth = window.screen.width;

  const handleClick = () => {
    dispatch(setCategory(item));
    open();
  };

  return (
    <div
      className={`${
        isDark
          ? `flex hover:bg-gray-200 cursor-pointer rounded-lg px-4 py-1 my-1  `
          : `flex hover:bg-gray-800 cursor-pointer rounded-lg px-4 py-1 my-1  `
      }`}
      onClick={handleClick}
    >
      <span className="text-lg mt-1 mr-2">
        <IoIosSearch />
      </span>{" "}
      {item}
    </div>
  );
};

export default SearchSuggestion;
