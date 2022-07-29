import {configureStore} from "@reduxjs/toolkit";
import songList from "@/store/songList";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const store= configureStore({
    reducer:{
        songList
    }
})

export default store
type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;