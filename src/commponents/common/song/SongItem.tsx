import React from "react";
import sy from './song.module.scss'
import {Song} from "@/models/song";
import {useFormatDuring} from "@/utils/number";
import {useAppSelector} from "@/store";
import {useDispatch} from "react-redux";
import {changeSongList, setCurIndex} from "@/store/songList";


const SongItem: React.FC<{ song: Song }> = (props) => {
    const song = props.song
    const {list,curIndex,length} = useAppSelector(state => state.songList);
    const dispatch = useDispatch();
    return <div className={sy.song} onClick={()=>{

        const newList = list.slice(0,curIndex+1).concat(song).concat(list.slice(curIndex+1,length))
        dispatch(changeSongList([...new Set(newList)]))
        dispatch(setCurIndex(curIndex+1))
    }
    }>
        <p>{song.name}</p>
        <p> {song.ar.first().name}</p>
        <p>{song.al.name}</p>
        <p>{useFormatDuring(song.dt / 1000)}</p>
    </div>
}

export default SongItem;