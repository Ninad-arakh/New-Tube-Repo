import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disable } from "../Utiliy/Store/AppSlice";
import { Link, useSearchParams } from "react-router-dom";
import { formatViews, URL } from "../Utiliy/Constants";
import LiveChat from "./LiveChat";
import axios from "axios";
import { AiOutlineDislike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegShareSquare } from "react-icons/fa";

const Watch = () => {
  const dispach = useDispatch();
  const [singleVideo, setVideo] = useState([]);
  const [singleVId, setSingleVId] = useState("");
  const [viewsCount, setViewsCount] = useState(null);
  const [disc, setDisc] = useState(false);
  const [vID] = useSearchParams();
  const videoId = vID.get("v");
  const [ChImagee, setImage] = useState("");
  const isDark = useSelector((store) => store.app.isDark);
  const screenWidth = window.screen.width;
  let isSide;
  if (screenWidth <= 640) {
    isSide = true;
  }

  const getSingleVideo = async () => {
    const json = await axios.get(`${URL}video?id=${videoId}`);
    setSingleVId(json?.data?.data?.items[0]?.snippet?.channelId);
    setVideo(json?.data?.data?.items[0]);
    const value = Number(json?.data?.data?.items[0]?.statistics?.viewCount);
    setViewsCount(formatViews(value));
    getChImg();
  };

  const handleDiscription = () => {
    setDisc(!disc);
  };

  // getting channel image url
  const getChImg = async () => {
    if (singleVId) {
      try {
        const ChImage = await axios.get(`${URL}chImage?id=${singleVId}`);
        setImage(ChImage?.data?.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const formatViews = (views) => {
    // Check if views is a number and is finite
    if (typeof views !== "number" || !isFinite(views)) {
      throw new Error("Invalid input: views should be a finite number.");
    }

    if (views >= 1_000_000) {
      return (views / 1_000_000).toFixed(1) + "M"; // e.g., 1.2M for 1,200,000
    } else if (views >= 1_000) {
      return (views / 1_000).toFixed(1) + "K"; // e.g., 1.2K for 1,200
    } else {
      return views.toString(); // Less than 1,000, no formatting needed
    }
  };

  useEffect(() => {
    dispach(disable());
    getSingleVideo();
  }, []);
  // console.log("views count: ", viewsCount);

  return (
    <div
      className={`${
        isSide
          ? "md:mt-[5rem] mt-[4rem] mx- md:ml-10 w-screen "
          : "md:mt-[5rem] mt-[4rem] mx-2 md:ml-10 flex w-[100%] "
      }`}
    >
      <div className="md:w-[53.4rem] w-[100%]">
        <div className="">
          <iframe
            className="rounded-xl "
            width={`${isSide ? screenWidth : "850"}`}
            height={`${isSide ? "275" : "475"}`}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        {/* video title and channel info */}
        <div className="mt-2 ml-3 md:mr-6 ">
          <h1 className="text-xl font-bold">{singleVideo?.snippet?.title}</h1>
          <div className="flex mt-2">
            {ChImagee !== "" ? (
              <img className="w-8 h-8  rounded-full" alt="ch" src={ChImagee} />
            ) : (
              <img className="w-8 h-8  rounded-full" alt="ch" src="" />
            )}
            <div className="ml-2">
              <Link
                to={`https://www.youtube.com/@${singleVideo?.snippet?.channelTitle.replace(
                  /\s/g,
                  ""
                )}`}
                className=" cursor-pointer"
              >
                {singleVideo?.snippet?.channelTitle}
              </Link>
              <p className=" text-xs"> 184k Subscriber</p>
            </div>
            {/* subscribe button */}
            <button className="my-0 mx-7 py-0 px-4 h-8 rounded-3xl bg-black text-white">
              Subscribe
            </button>
          </div>
        </div>
        {/* another div for likes dislike share download and other */}
        {!isSide && (
          <div className="flex ml-[50%] -mt-7 items-center">
            <button
              className={`${
                isDark
                  ? "my-0 overflow-hidden  py-1 px-4 h-8 rounded-l-3xl border border-gray-600 hover:bg-gray-200 flex flex-wrap "
                  : "my-0 overflow-hidden  py-1 px-4 h-8 rounded-l-3xl border border-gray-600 hover:bg-gray-800 flex flex-wrap "
              }`}
            >
              <span>
                <AiOutlineLike />
              </span>
              {singleVideo?.statistics?.likeCount}
            </button>
            <button
              className={`${
                isDark
                  ? "my-0 overflow-hidden  py-0 px-4 h-8 rounded-r-3xl border border-gray-600 hover:bg-gray-200 "
                  : "my-0 overflow-hidden  py-0 px-4 h-8 rounded-r-3xl border border-gray-600 hover:bg-gray-800 "
              }`}
            >
              <AiOutlineDislike />
            </button>
            <button
              className={`${
                isDark
                  ? `my-0 overflow-hidden mx-1 py-0 px-4 h-8 rounded-3xl border border-gray-600 hover:bg-gray-200 flex items-center gap-1`
                  : `my-0 overflow-hidden mx-1 py-0 px-4 h-8 rounded-3xl border border-gray-600 hover:bg-gray-800  flex items-center gap-1`
              }`}
            >
              <FaRegShareSquare />
              Share
            </button>
            <button
              className={`${
                isDark
                  ? `my-0 overflow-hidden mx-1 py-0 px-4 h-8 rounded-3xl border border-gray-600 hover:bg-gray-200`
                  : `my-0 overflow-hidden mx-1 py-0 px-4 h-8 rounded-3xl border border-gray-600 hover:bg-gray-800 `
              }`}
            >
              Download
            </button>
            <button
              className={`${
                isDark
                  ? `my-0 overflow-hidden mx-1 py-0 px-4 h-8 rounded-3xl border border-gray-600 hover:bg-gray-200`
                  : `my-0 overflow-hidden mx-1 py-0 px-4 h-8 rounded-3xl border border-gray-600 hover:bg-gray-800 `
              }`}
            >
              ...
            </button>
          </div>
        )}
        {/* discription div */}
        <div
          className={`${
            isDark
              ? `${!disc ? "bg-gray-300 rounded-xl border-green-500 mb-4" : "bg-gray-300 rounded-xl mb-4"}`
              : `${!disc ? "bg-gray-800 rounded-xl border-green-500 mb-4" : "bg-gray-800 rounded-xl mb-4"}`
          }`}
        >
          <div
            className={`${
              isDark
                ? `${
                    !disc
                      ? "truncate w-[100%] my-2 px-3 py-2 "
                      : "leading-tight  px-3 py-2"
                  }`
                : `${
                    !disc
                      ? "truncate w-[100%] my-2 px-3 py-2  "
                      : "leading-tight px-3 py-2"
                  }`
            }`}
          >
            <h1 className={`${!disc ? "font-medium text-sm my-0" : "font-medium text-sm mt-2"}`}>{viewsCount} views</h1>
            <br></br>
            <p>{singleVideo?.snippet?.description}</p>
          </div>
          <div className="w-full flex justify-end">
          <button
            onClick={handleDiscription}
            className={`${
              isDark
                ? "mt-2 pb-3 ml-[70%]"
                : "mt-2 pb-3 ml-[70%]"
            }`}
          >
            {!disc ? "Show More..." : "Show Less..."}
          </button>
          </div>
        </div>
      </div>

      {/* live chat container👇 */}
      <div className="w-full md:w-[27%] md:mx-5">
        <LiveChat />
      </div>
    </div>
  );
};

export default Watch;
