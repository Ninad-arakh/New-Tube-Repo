import React from "react";
import ButtonList from "./ButtonList";
import VideoList from "./VideoCard";

const MainBody = () => {
  return (
    <div className="w-full ">
      <ButtonList />
      <VideoList />
    </div>
  );
};

export default MainBody;
