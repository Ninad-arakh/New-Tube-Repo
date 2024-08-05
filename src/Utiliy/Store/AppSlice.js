import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
  name: "app",
  initialState: {
    istoggle: true,
    videos: [],
    category: "All",
    searchSuggestion: [],
  },
  reducers: {
    toggle: (state) => {
      state.istoggle = !state.istoggle;
    },
    disable: (state) => {
      state.istoggle = false;
    },
    addVideos: (state, action) => {
      state.videos = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearchSuggestions: (state, action) => {
      state.searchSuggestion = action.payload;
    },
  },
});

export const { toggle, disable, addVideos, setCategory, setSearchSuggestions } =
  AppSlice.actions;
export default AppSlice.reducer;
