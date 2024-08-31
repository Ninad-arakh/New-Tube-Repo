import { MdHomeFilled } from "react-icons/md";
import { PiFilmReelThin } from "react-icons/pi";
import { MdOutlineSubscriptions } from "react-icons/md";
import { GrChannel } from "react-icons/gr";
import { GoHistory } from "react-icons/go";
import { MdPlaylistPlay } from "react-icons/md";
import { LiaFileVideoSolid } from "react-icons/lia";
import { BsClockHistory } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FaGripfire } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { RiMovieLine } from "react-icons/ri";
import { MdOutlineWifiTethering } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebarr = () => {
  const select = useSelector((store) => store.app.istoggle);
  let isSide;
  const screenWidth = window.screen.width;
  if (screenWidth <= 640) {
    isSide = true;
  }
  if (!select) {
    return null;
  }

  return (
    <div
      className={`${
        isSide
          ? "absolute bg-white mt-10  "
          : "border  mt-14 md:w-[15.6666%] h-[100vh] absolute bg-white overflow-x-hidden overflow-y-scroll ml-0  "
      }`}
    >
      <div className=" p-3">
        <p className="flex  cursor-pointer p-2 font-bold gap-8 bg-gray-100 rounded-lg text-xs">
          <MdHomeFilled className="text-2xl ml-1 -mt-1" />{" "}
          <Link to="/"> Home </Link>
        </p>
        <p className="flex cursor-pointer p-2  gap-8 text-xs hover:bg-gray-200">
          <PiFilmReelThin className="text-2xl ml-1 -mt-1" /> Shorts
        </p>
        <p className="flex cursor-pointer p-2  gap-8 text-xs hover:bg-gray-200">
          <MdOutlineSubscriptions className="text-2xl ml-1 -mt-1" />{" "}
          Subscription
        </p>
        <div className="border border-gray-200 w-full"></div>
      </div>

      <div className="mt-2 p-3">
        <p className="flex cursor-pointer p-2 gap-8  rounded-lg text-xs hover:bg-gray-200">
          <GrChannel className="text-2xl ml-1 -mt-1" /> Your Channel
        </p>
        <p className="flex cursor-pointer p-2 gap-8 text-xs hover:bg-gray-200">
          <GoHistory className="text-2xl ml-1 -mt-1" /> History
        </p>
        <p className="flex cursor-pointer p-2 gap-8 text-xs hover:bg-gray-200">
          <MdPlaylistPlay className="text-2xl ml-1 -mt-1" /> Playlist
        </p>
        <p className="flex cursor-pointer p-2 gap-8 text-xs hover:bg-gray-200">
          <LiaFileVideoSolid className="text-2xl ml-1 -mt-1" /> Your Videos
        </p>
        <p className="flex cursor-pointer p-2 gap-8 text-xs hover:bg-gray-200">
          <AiOutlineLike className="text-2xl ml-1 -mt-1" /> Liked Videos
        </p>
        <p className="flex cursor-pointer p-2 gap-8 text-xs hover:bg-gray-200">
          <BsClockHistory className="text-2xl ml-1 -mt-1" /> Wathc Later
        </p>
        <div className="border border-gray-200 w-full"></div>
      </div>

      <div className="mt-2 p-3">
        <p className="flex cursor-pointer p-2 gap-8  rounded-lg text-xs hover:bg-gray-200">
          <FaGripfire className="text-2xl ml-1 -mt-1" /> Trending
        </p>
        <p className="flex cursor-pointer p-2 gap-8  rounded-lg text-xs hover:bg-gray-200">
          <MdOutlineShoppingBag className="text-2xl ml-1 -mt-1" /> Shoping
        </p>
        <p className="flex cursor-pointer p-2 gap-8  rounded-lg text-xs hover:bg-gray-200">
          <IoMusicalNotesOutline className="text-2xl ml-1 -mt-1" /> Music
        </p>
        <p className="flex cursor-pointer p-2 gap-8  rounded-lg text-xs hover:bg-gray-200">
          <RiMovieLine className="text-2xl ml-1 -mt-1" /> Movies
        </p>
        <p className="flex cursor-pointer p-2 gap-8  rounded-lg text-xs hover:bg-gray-200">
          <MdOutlineWifiTethering className="text-2xl ml-1 -mt-1" /> Live
        </p>
        <div className="border border-gray-200 w-full"></div>
      </div>

      <div className="mt-2 p-3">
        <p className="flex cursor-pointer p-2 gap-8  rounded-lg text-xs hover:bg-gray-200">
          <GrChannel className="text-2xl ml-1 -mt-1" /> Your Channel
        </p>
        <p className="flex cursor-pointer p-2 gap-8 text-xs hover:bg-gray-200">
          <GoHistory className="text-2xl ml-1 -mt-1" /> History
        </p>
        <p className="flex cursor-pointer p-2 gap-8 text-xs hover:bg-gray-200">
          <MdPlaylistPlay className="text-2xl ml-1 -mt-1" /> Playlist
        </p>
        <p className="flex cursor-pointer p-2 gap-8 text-xs hover:bg-gray-200">
          <LiaFileVideoSolid className="text-2xl ml-1 -mt-1" /> Your Videos
        </p>
        <p className="flex cursor-pointer p-2 gap-8 text-xs hover:bg-gray-200">
          <AiOutlineLike className="text-2xl ml-1 -mt-1" /> Liked Videos
        </p>
        <p className="flex cursor-pointer p-2 gap-8 text-xs hover:bg-gray-200">
          <BsClockHistory className="text-2xl ml-1 -mt-1" /> Wathc Later
        </p>
        <div className="border border-gray-200 w-full"></div>
      </div>
    </div>
  );
};

export default Sidebarr;
