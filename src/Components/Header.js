import React from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toggle, setCategory } from "../Utiliy/Store/AppSlice";
import { useState, useEffect } from "react";
import { YOUTUBE_SUGGESTION_API } from "../Utiliy/Constants";
import { setSearchSuggestions } from "../Utiliy/Store/AppSlice";
import SearchSuggestion from "./SearchSuggestionCard";
import DarkMod from "./DarkMod";
import { IoMdClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";

const Header = () => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { searchSuggestion } = useSelector((store) => store.app);
  const toggleMenu = useSelector((store) => store.app.istoggle);
  const isDark = useSelector((store) => store.app.isDark);
  const screenWidth = window.screen.width;
  let isSide;
  if (screenWidth <= 640) {
    isSide = true;
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      showSuggestions();
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  const toggleHandler = () => {
    dispatch(toggle());
  };

  const SearchCallHandler = () => {
    dispatch(setCategory(input));
    setInput("");
  };

  const showSuggestions = async () => {
    const data = await fetch(YOUTUBE_SUGGESTION_API + input);
    const json = await data.json();
    dispatch(setSearchSuggestions(json[1]));
    // console.log("json" , json);
  };

  const isOpen = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`${
        isDark
          ? "flex justify-between items-center w-[100%] mx-0 pt-2 p-[1%] fixed z-10   md:mx-[1%] md:p-[1%] bg-white"
          : "flex justify-between items-center w-[100%] mx-0 pt-2 p-[1%] fixed z-10 bg-black text-white md:mx-[1%] md:p-[1%] "
      }`}
    >
      {/* hamburger icon and youtube icon */}
      <div className="flex ml-2 md:ml-0">
        {!toggleMenu ? (
          <div className={`${
              !isDark
                ? `h-5 md:h-6 my-1 cursor-pointer text-2xl rounded-lg text-white`
                : `h-5 md:h-6 my-1 cursor-pointer text-2xl rounded-lg hover:bg-gray-200`
            }`} 
          >
            <IoMenu onClick={() => toggleHandler()}/>
          </div>
        ) : (
          <div
            className={`${
              isDark
                ? "h-8  px-1 md:h-6 my-1 cursor-pointer text-2xl rounded-lg  "
                : "h-8  px-1 md:h-6 my-1 cursor-pointer text-2xl rounded-lg "
            }`}
          >
            <IoMdClose onClick={() => toggleHandler()} />
          </div>
        )}
        <img
          className="h-6 ml-2 md:h-8 md:ml-5 mt-[2px] md:mt-0"
          alt="logo"
          src="https://seeklogo.com/images/V/vanced-logo-ABBC416B5F-seeklogo.com.png"
        />
      </div>

      {/* Search field and Search button */}
      <form
        className="text-center  md:w-5/12 "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search"
          onFocus={() => isOpen()}
          className={`${
            isDark
              ? "py-[2px]  border border-gray-400  rounded-l-2xl  w-[73%] md:w-10/12 pl-[4%] md:pl-[2.70rem]"
              : "py-[2px]  border bg-gray-800  rounded-l-2xl  w-[73%] md:w-10/12 pl-[4%] md:pl-[2.70rem]"
          }`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className={`${
            isDark
              ? "border border-gray-400 rounded-r-2xl px-3 md:px-2 pt-[3.6px] pb-[7.1px] w-10 md:w-16 md:pl-5 hover:bg-gray-200 "
              : "border border-gray-400 rounded-r-2xl px-3 md:px-2 pt-[3.6px] pb-[7.1px] w-10 md:w-16 md:pl-5 hover:bg-gray-800 "
          }`}
          onClick={() => SearchCallHandler()}
        >
          <IoIosSearch />
        </button>
        {/* a div for the search suggestions */}
        <div>
          {open && searchSuggestion.length !== 0 && (
            <div
              className={`${
                isDark
                  ? `absolute border border-black rounded-lg ml-1 sm:w-[29rem]  sm:ml-4 text-left bg-white w-[215px]`
                  : `absolute border border-black rounded-lg ml-1 sm:w-[29rem]  sm:ml-4 text-left bg-black w-[215px]`
              }`}
            >
              <ul>
                {searchSuggestion.map((item, indx) => (
                  <div key={indx}>
                    <SearchSuggestion item={item} open={isOpen} />
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </form>

      {/* Profile */}
      <div className="flex">
        <div>
          <DarkMod />
        </div>
        <img
          alt="user"
          src="https://tse3.mm.bing.net/th?id=OIP.XV6-vNO2lVeC7xxnM1XjngHaFk&pid=Api&P=0&h=220"
          className="rounded-full w-8 h-8 mx-5 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
