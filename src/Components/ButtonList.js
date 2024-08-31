import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../Utiliy/Store/AppSlice";

const ButtonList = () => {
  const [active, setActive] = useState("All");
  const dispatch = useDispatch()
  const butonlist = [
    "All",
    "Music",
    "Movies",
    "Anime",
    "Coding",
    "DSA",
    "Software Engineering",
    "Travel",
    "Attack On Titan",
    "Death Note",
    "POP",
    "DC comics",
    "Anime",
  ];

  const videobyTag = (tag) => {
    if (active !== tag) {
      setActive(tag);
      dispatch(setCategory(tag));
    }
  };

  return (
    <div className=" mt-[12%] sm:mt-[6%] flex w-full overflow-hidden">
      <div className="flex w-full ">
        {butonlist.map((buton, i) => (
          <button
            key={i}
            className={`${
              active === buton
                ? "bg-slate-900 text-white ml-[1%] h-[100%] border border-gray-400 rounded-lg px-2  duration-200"
                : "ml-2 h-[100%] border border-gray-400 rounded-lg px-2 hover:bg-gray-100 duration-200"
            }x`}
            onClick={() => videobyTag(buton)}
          >
            <span className="whitespace-nowrap">{buton}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonList;
