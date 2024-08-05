import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { disable } from "../Utiliy/Store/AppSlice";
import { useSearchParams } from "react-router-dom";
import { api } from "../Utiliy/Constants";
import LiveChat from "./LiveChat";

const Watch = () => {
  const dispach = useDispatch();
  const [singleVideo, setVideo] = useState([]);
  const [vID] = useSearchParams();
  const videoId = vID.get("v");
  const [ChImagee, setImage] = useState("");

  const getSingleVideo = async () => {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${api}`
    );
    const json = await res.json();
    setVideo(json?.items[0]);
  };

  // getting channel image url
  const getChImg = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${singleVideo?.snippet?.channelId}&key=${api}`
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
    <div className="mt-[5rem] ml-10 flex w-[100%] ">
      {/*  main video div */}
      <div className="w-[53.4rem]">
        <div className="video">
          <iframe
            className="rounded-xl"
            width="850"
            height="475"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        {/* video title and channel info */}
        <div className="mt-2 mr-6">
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
        {/* discription div */}
        <div className="mt-5 py-1 px-3 bg-gray-300 rounded-3xl">
          <h1 className="">{singleVideo?.statistics?.viewCount} views </h1>
          <br></br>
          <p>{singleVideo?.snippet?.description}</p>
        </div>
      </div>

      {/* live chat container👇 */}
      <div className="w-[27%] mx-5">
        <LiveChat />
      </div>
    </div>
  );
};

export default Watch;
