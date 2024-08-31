import React from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setCategory } from "../Utiliy/Store/AppSlice";

const SearchSuggestion = ({item, open}) => {
  const dispatch = useDispatch();

  const handleClick = ()=>{
    dispatch(setCategory(item));
    open();
  }

  return (
    <div className="flex hover:bg-gray-200 cursor-pointer rounded-lg px-4 py-1 my-1" onClick={handleClick}>
      <span className="text-lg mt-1 mr-2">
        <IoIosSearch />
      </span>{" "}
      {item}
    </div>
  );
};

export default SearchSuggestion;
