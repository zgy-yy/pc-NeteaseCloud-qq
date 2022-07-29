import {Action, createSlice} from "@reduxjs/toolkit";
import {Song} from "@/models/song";


const songList = createSlice({
    name: 'songList',
    initialState: {
        length: 0,
        list: [] as Song[],
        curIndex: -1,
        showList: false
    },
    reducers: {
        changeSongList(state, action: { type: string, payload: Song[] }) {
            console.log(action)
            state.length = action.payload.length
            if (action.payload.length > 0) {
                state.curIndex = 0
            }
            state.list = action.payload
        },
        setShowList(state, action: { type: string, payload: boolean }) {
            state.showList = action.payload
        },
        setCurIndex(state,action:{type: string, payload: number}){
            if (state.length>0){
                state.curIndex = action.payload
            }
        }
    }

})

export const {changeSongList, setShowList,setCurIndex} = songList.actions

export default songList.reducer