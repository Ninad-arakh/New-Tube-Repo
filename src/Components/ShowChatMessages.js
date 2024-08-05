import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react"
import { generateRName, generateRandText } from "../Utiliy/helper";
import { setMessage } from "../Utiliy/Store/ChatSlice"

//showing messages
const Message = ({ name, message }) => {
  
  return (
    <div className="flex w-full mt-2 bg-gray-100 rounded-lg">
      {/* avatar image */}
      <div className="">
        <img
          alt="user"
          src="https://wallpaperaccess.com/full/2467339.jpg"
          className="rounded-full w-7 h-7 mx-2"
        />
      </div>
      <div>
        <p className="text-gray-600 font-bold text-sm">{name}</p>
      </div>
      <div className="ml-2">
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  );
};

const ShowChatMessages = () => {
  const dispatch = useDispatch();
  const messageObj = useSelector((store) => store.chat.message);
  useEffect(() => {
    const i = setInterval(() => {
      dispatch(setMessage({name:generateRName(), message: generateRandText(20)}))
    },500);

    return () => {
      clearInterval(i);
    };
  }, []);

  if (messageObj != null) {
    return (
      <div className="flex flex-col-reverse ">
        {messageObj.map((message, ind) => [
            <Message key={ind} name={message.name} message={message.message} />,
          ])}
        <Message />
      </div>
    );
  } else {
    return <div>No messages</div>;
  }
};

export default ShowChatMessages;
