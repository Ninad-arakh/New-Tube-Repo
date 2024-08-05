import React from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toggle, setCategory } from "../Utiliy/Store/AppSlice";
import { useState, useEffect } from "react";
import { YOUTUBE_SUGGESTION_API } from "../Utiliy/Constants";
import { setSearchSuggestions } from "../Utiliy/Store/AppSlice";

const Header = () => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { searchSuggestion } = useSelector((store) => store.app);

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
    <div className="flex justify-between items-center w-[100%] mx-3 p-2 fixed z-10 bg-white ">
      {/* hamburger icon and youtube icon */}
      <div className="flex">
        <img
          className="h-6 my-1 cursor-pointer font-thin rounded-lg hover:bg-gray-200"
          alt="button"
          src="https://cdn2.iconfinder.com/data/icons/clean-minimal-set/16/open-menu-01-512.png"
          onClick={() => toggleHandler()}
        />
        <img
          className="h-8 ml-5"
          alt="logo"
          src="https://seeklogo.com/images/V/vanced-logo-ABBC416B5F-seeklogo.com.png"
        />
      </div>

      {/* Search field and Search button */}
      <div className="text-center w-5/12 ">
        <input
          type="text"
          placeholder="Search"
          onFocus={() => isOpen()}
          onBlur={() => setOpen(false)}
          className="py-[2px] pl-[2.70rem] border border-gray-400  rounded-l-2xl focus:border-blue-500 w-10/12"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="border border-gray-400 rounded-r-2xl px-2 pt-[3.6px] pb-[7.1px] w-16 pl-5 hover:bg-gray-200"
          onClick={() => SearchCallHandler()}
        >
          <IoIosSearch />
        </button>
        {/* a div for the search suggestions */}
        <div>
          {open && searchSuggestion.length !== 0 && (
            <div className="absolute border border-black rounded-lg w-[29rem]  ml-4 text-left bg-white">
              <ul>
                {searchSuggestion.map((item, indx) => (
                  <div key={indx}>
                    <li className="flex hover:bg-gray-200 cursor-pointer rounded-lg px-4 py-1 my-1">
                      <span className="text-lg mt-1 mr-2">
                        <IoIosSearch />
                      </span>{" "}
                      {item}
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Profile */}
      <div>
        <img
          alt="user"
          src="https://tse3.mm.bing.net/th?id=OIP.XV6-vNO2lVeC7xxnM1XjngHaFk&pid=Api&P=0&h=220"
          className="rounded-full w-8 h-8 mx-5"
        />
      </div>
    </div>
  );
};

export default Header;