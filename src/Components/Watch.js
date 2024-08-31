import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { disable } from "../Utiliy/Store/AppSlice";
import { useSearchParams } from "react-router-dom";
import { api, apiNew, formatViews } from "../Utiliy/Constants";
import LiveChat from "./LiveChat";

const Watch = () => {
  const dispach = useDispatch();
  const [singleVideo, setVideo] = useState([]);
  const [disc, setDisc] = useState(false);
  const [vID] = useSearchParams();
  const videoId = vID.get("v");
  const [ChImagee, setImage] = useState("");
  const screenWidth = window.screen.width;
  let isSide;
  if (screenWidth <= 640) {
    isSide = true;
  }

  

  const getSingleVideo = async () => {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apiNew}`
    );
    const json = await res.json();
    setVideo(json?.items[0]);
  };

  const handleDiscription = () => {
    setDisc(!disc);
  };

  // getting channel image url
  const getChImg = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${singleVideo?.snippet?.channelId}&key=${apiNew}`
      );
      const ChImage = await response.json();
      setImage(ChImage?.items[0]?.snippet?.thumbnails?.high?.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispach(disable());
    getSingleVideo();
    getChImg();
  }, []);

  return (
    <div
      className={`${
        isSide
          ? "md:mt-[5rem] mt-[4rem] mx- md:ml-10 w-screen "
          : "md:mt-[5rem] mt-[4rem] mx-2 md:ml-10 flex w-[100%] "
      }`}
    >
      <div className="md:w-[53.4rem] w-[100%]">
        <div className="pr-4">
          <iframe
            className="rounded-xl "
            width={`${isSide ? "390" : "850"}`}
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
              <p className=" cursor-pointer">
                {singleVideo?.snippet?.channelTitle}
              </p>
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
          <div className="flex ml-[50%] -mt-10">
            <button className="my-0 overflow-hidden  py-0 px-4 h-8 rounded-l-3xl border border-gray-600 hover:bg-gray-200 text-gray-800">
              {singleVideo?.statistics?.likeCount} Likes
            </button>
            <button className="my-0 overflow-hidden  py-0 px-4 h-8 rounded-r-3xl border border-gray-600 hover:bg-gray-200 text-gray-800">
              Dislike
            </button>
            <button className="my-0 overflow-hidden mx-1 py-0 px-4 h-8 rounded-3xl border border-gray-600 hover:bg-gray-200 text-gray-800">
              Share
            </button>
            <button className="my-0 overflow-hidden mx-1 py-0 px-4 h-8 rounded-3xl border border-gray-600 hover:bg-gray-200 text-gray-800">
              Download
            </button>
            <button className="my-0 overflow-hidden mx-1 py-0 px-4 h-8 rounded-3xl border border-gray-600 hover:bg-gray-200 text-gray-800">
              ...
            </button>
          </div>
        )}
        {/* discription div */}
        <div
          className={`${
            !disc
              ? "h-24 w-[100%] mt-5 py-1 px-3 bg-gray-300 rounded-3xl overflow-hidden"
              : " mt-5 py-1 px-3 bg-gray-300 rounded-3xl overflow-hidden"
          }`}
        >
          <h1 className="">{singleVideo?.statistics?.viewCount} views</h1>
          <br></br>
          <p>{singleVideo?.snippet?.description}</p>
        </div>
        <button onClick={handleDiscription} className="mt-2 ml-[70%]">
          {!disc ? "Show More..." : "Show Less..."}
        </button>
      </div>

      {/* live chat container👇 */}
      <div className="w-full md:w-[27%] md:mx-5">
        <LiveChat />
      </div>
    </div>
  );
};

export default Watch;
