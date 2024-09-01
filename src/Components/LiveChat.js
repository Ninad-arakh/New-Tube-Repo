import { useState } from "react";
import React from "react";
import ShowChatMessages from "./ShowChatMessages";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../Utiliy/Store/ChatSlice";

const LiveChat = () => {
  const [ipMessage, setipMessage] = useState("");
  const dispatch = useDispatch();
  const isDark = useSelector((store) => store.app.isDark);

  const sendMessage = () => {
    dispatch(setMessage({ name: "gohan", message: ipMessage }));
  };
  return (
    <div className="">
      {/* live chat comments */}
      <div className="border border-black px-1 rounded-lg h-[27rem] overflow-y-scroll">
        {/* Header */}
        <div className="border border-black mb-2 -ml-1 p-2 rounded-t-lg rounded-r-none -mr-1">
          <h1>Live Chat</h1>
        </div>
        {/* Main chat body */}
        <div className="justify-end ">
          <ShowChatMessages />
        </div>
      </div>

      {/* send comment */}
      <form
        className="border flex px-0 items-center border-black rounded-lg my-1 justify-between"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* avatar image */}
        <div className="">
          <img
            alt="user"
            src="https://tse3.mm.bing.net/th?id=OIP.XV6-vNO2lVeC7xxnM1XjngHaFk&pid=Api&P=0&h=220"
            className="rounded-full w-7 h-7 mx-2"
          />
        </div>
        {/* input field */}
        <div>
          <input
            type="text"
            placeholder="Comment"
            className={`${isDark? "my-1 mx-0 w-56 px-2 rounded-lg" : "my-1 mx-0 w-56 px-2 bg-gray-800 rounded-lg"}`}
            onChange={(e) => {
              setipMessage(e.target.value);
            }}
          ></input>
        </div>
        {/* send button */}
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-
                        2 px-4 rounded mr-1"
            onClick={() => sendMessage()}
          >
            {" "}
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default LiveChat;
