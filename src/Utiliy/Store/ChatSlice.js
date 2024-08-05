import { createSlice } from "@reduxjs/toolkit";

const ChatSlice = createSlice({
  name: "chat",
  initialState: {
    message: [],
  },
  reducers: {
    setMessage: (state, action) => {
      state.message.splice(200,1);
      state.message.unshift(action.payload);
      
    },
  },
});

export const { setMessage } = ChatSlice.actions;
export default ChatSlice.reducer;
