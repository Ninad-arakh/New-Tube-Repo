import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_API, api } from "../Utiliy/Constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addVideos } from "../Utiliy/Store/AppSlice";

// rendering each video card by getting prop
export const VideoCard = (props) => {
  const { snippet, statistics } = props?.props;
  const [ChImagee, setImage] = useState("");

  // fetching the image of the channel
  const getChImg = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${snippet?.channelId}&key=${api}`
      );
      const ChImage = await response.json();
      setImage(ChImage?.items[0]?.snippet?.thumbnails?.high?.url);
    } catch (error) {
      console.log(error);
    }
  };

  // this hook for doing the asynchronous tasks
  useEffect(() => {
    getChImg();
  });

  // and finally the jsx code for the card to display/render
  return (
    <div
      className=" border overflow-hidden cursor-pointer flex flex-col mt-2 w-[97%] md:h-[16rem] md:w-[17rem] rounded-2xl hover:bg-gray-200 duration-[0.3s]
    "
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
            <img alt="im" src={ChImagee} className="rounded-full w-10 h-10" />
          ) : (
            <img className="rounded-full w-10 h-10" />
          )}
        </div>
        <div className=" mb-1 mr-1">
          <p className="text-sm font-bold ">{snippet?.title}</p>
          <p className="text-sm">{snippet?.channelTitle}</p>
          <p className="">{statistics?.viewCount} Views</p>
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
    const data = await fetch(YOUTUBE_VIDEO_API);
    const json = await data.json();
    setVideos(json.items);
  };

  // fetching the videos by the categorybutton
  const getVideosByCategory = async () => {
    const data = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${CategoryButn}&type=video&key=${api}`
    );
    const json = await data.json();
    dispatch(addVideos(json?.items));
    setVideos(json?.items);
  };

  if (videos.length === 0) return <Shimmer />;

  return (
    <div className="my-2 mx-4 flex flex-wrap  ">
      {videos.map((video, i) => {
        return (
          <Link
            to={`/watch?v=${
              typeof video.id === "object" ? video.id.videoId : video.id
            }`}
            key={i}
          >
            <VideoCard props={video} />
          </Link>
        );
      })}
    </div>
  );
};

export default VideoList;
