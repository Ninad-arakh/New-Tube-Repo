import React, { useEffect, useState } from "react";
import { URL} from "../Utiliy/Constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addVideos } from "../Utiliy/Store/AppSlice";
import { formatViews } from "../Utiliy/Constants"
import axios from "axios";

// rendering each video card by getting prop
export const VideoCard = (props) => {
  const { snippet, statistics } = props?.props;
  const [ChImagee, setImage] = useState("");
  const isDark = useSelector((store) => store.app.isDark);

  // fetching the image of the channel
  const getChImg = async () => { 
    try {
      const ChImage = await axios.get(`${URL}chImage?id=${snippet?.channelId}`);
      setImage(ChImage?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  let isSide;
  const screenWidth = window.screen.width;
  if (screenWidth <= 640) {
    isSide = true;
  }

  // this hook for doing the asynchronous tasks
  useEffect(() => {
    getChImg();
  });
  let viewsCount = Number(statistics?.viewCount);

  // and finally the jsx code for the card to display/render
  return (
    <div
      className={` ${
        isDark
          ? ` ${
              isSide
                ? `border overflow-hidden cursor-pointer flex flex-col mt-2 w-[96%] md:h-[16rem] md:w-[17rem] rounded-2xl hover:bg-gray-200 duration-[0.3s] ml-1`
                : `border overflow-hidden cursor-pointer flex flex-col mt-2 w-[96%] md:h-[16rem] md:w-[17rem] rounded-2xl hover:bg-gray-200 duration-[0.3s] ml-1`
            }  `
          : `${
              isSide
                ? `border  overflow-hidden cursor-pointer flex flex-col mt-2 w-[96%] md:h-[16rem] md:w-[17rem] rounded-2xl hover:bg-gray-800 duration-[0.3s] ml-1`
                : ` overflow-hidden cursor-pointer flex flex-col mt-2 w-[96%] md:h-[16rem] md:w-[17rem] rounded-2xl hover:bg-gray-800 duration-[0.3s] ml-1`
            }  `
      }`}
    >
      {/* thumbnail of the video */}
      <div className="img rounded-2xl">
        {snippet?.thumbnails?.maxres ? (
          <img
            alt="thumbnail"
            src={snippet?.thumbnails?.maxres?.url}
            className="md:w-[18rem] rounded-2xl p-1 "
          />
        ) : (
          <img
            alt="thumbnail"
            src={snippet?.thumbnails?.medium?.url}
            className="md:w-[18rem] rounded-2xl p-1 "
          />
        )}
      </div>

      {/* details of the video */}
      <div className="flex overflow-hidden">
        <div className=" m-1 overflow-hidden">
          {ChImagee !== "" ? (
            <img alt="im" src={ChImagee} className="rounded-full w-10 h-10 object-cover " />
          ) : (
            <img className="rounded-full w-10 h-10 object-cover " />
          )}
        </div>
        <div className=" mb-1 mr-1">
          <p className="text-sm font-bold ">{snippet?.title}</p>
          <p className="text-sm">{snippet?.channelTitle}</p>
          <p className="">{viewsCount && formatViews(viewsCount)} Views</p>
        </div>
      </div>
    </div>
  );
};

// got the video list here
const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const CategoryButn = useSelector((store) => store.app.category);

  useEffect(() => {
    if (CategoryButn === "All") {
      fetchVideo();
    } else {
      getVideosByCategory();
    }
  }, [CategoryButn]);

  const fetchVideo = async () => {
    const data = await axios.get(URL+"home");
    const json = await data?.data?.data;
    setVideos(json?.items);
  };

  // fetching the videos by the categorybutton
  const getVideosByCategory = async () => {
    const json = await axios.get(`${URL}category?q=${CategoryButn}`);
    console.log("categoryBtn : ", json)
    dispatch(addVideos(json?.data?.data?.items));
    setVideos(json?.data?.data?.items);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  };

  if (videos.length === 0) return <Shimmer />;

  return (
    <div className="my-2 mx-2 flex flex-wrap w-[99%] ">
      {videos.map((video, i) => {
        return (
          <Link
            to={`/watch?v=${
              typeof video.id === "object" ? video.id.videoId : video.id
            }`}
            key={i}
            onClick={handleScrollToTop}
          >
            <VideoCard props={video} />
          </Link>
        );
      })}
    </div>
  );
};

export default VideoList;
