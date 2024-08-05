import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "./AppSlice";
import ChatReducer from "./ChatSlice";
import SearchReducer from "./SearchSlice";

const Store = configureStore({
    reducer:{
        app: AppSlice,
        chat: ChatReducer,
        Cache: SearchReducer
    }
})

export default Store;