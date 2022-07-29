import React, {useEffect, useMemo, useState} from "react";
import {useLocation} from "react-router-dom";
import {useArtistDetail, useArtistSongs, usePlayListDetail, usePlayListTrackAll} from "@/api/api";
import {PlayListDetail} from "@/models/playlist";
import Info from "@/views/playlist/info/Info";
import {Song} from "@/models/song";
import SongItem from "@/commponents/common/song/SongItem";
import {ArtistDetail} from "@/models/artist_detail";
import sy from './playlist.module.scss'
import LoadMore from "@/commponents/common/loadmore/LoadMore";
import {useDispatch} from "react-redux";
import songList, {changeSongList} from "@/store/songList";

const Playlist: React.FC = () => {
    const {id, type} = useLocation().state as { id: number, type: number };
    const [playlistDetail, setPlaylistDetail] = useState<PlayListDetail>()
    const [artistDetail, setArtistDetail] = useState<ArtistDetail>()
    const [songs, setSongs] = useState<Song[]>([])

    useEffect(() => {
        if (type == 0) {//歌单
            usePlayListDetail(id).then(data => {
                setPlaylistDetail(data)
            })
            usePlayListTrackAll(id).then(data => {
                setSongs(data)
            })
        } else if (type == 1) {//歌手
            useArtistDetail(id).then(data => {
                setArtistDetail(data)
            })
            getArtistSongs()
        }
    }, [])
    const [pageData, setPageData] = useState({
        order: 'hot',
        limit: 20,
        page: 1,
        loading: false,
        noMore: false,
    })
    const offset = useMemo(() => {
        if (pageData.page === 1)
            return 0

        return pageData.limit + songs.length
    }, [pageData, songs])

    useEffect(() => {
        if (type == 1) {
            getArtistSongs()
        }
    }, [pageData])

    function getArtistSongs() {
        useArtistSongs(id, pageData.order, pageData.limit, offset).then(data => {
            if (pageData.page === 1) {
                setSongs(data.songs)
            } else {
                setSongs([...songs, ...data.songs])
            }
            if (data.songs.length < pageData.limit)
                setPageData({...pageData, noMore: true})
        })
    }

    const dispatch = useDispatch();


    return (
        <div>
            <Info onClick={()=>{
                dispatch(changeSongList(songs))
            }} playlistDetail={playlistDetail} artistDetail={artistDetail}/>
            {
                playlistDetail ? <div className={sy.item}>
                    <span>歌曲</span>
                    <span>评论</span>
                </div> : ''
            }{
            artistDetail ? <div className={sy.item}>
                <span>歌曲</span>
                <span>专辑</span>
                <span>视频</span>
                <span>详情</span>
            </div> : ''
        }

            {
                artistDetail ? <div className={sy.opt}>
                    <div>
                        <span>播放全部</span>
                    </div>
                    <div>
                        <span onClick={() => {
                            setPageData({...pageData, order: 'hot'})
                        }} className={pageData.order == 'hot' ? sy.select : ''}>最热</span>
                        <span onClick={() => {
                            setPageData({...pageData, order: 'time'})
                        }} className={pageData.order == 'time' ? sy.select : ''}>最新</span>
                    </div>
                </div> : ''
            }
            {
                songs.map(song => {
                    return <SongItem key={song.id} song={song}/>
                })
            }
            {
                artistDetail && !pageData.noMore ? <LoadMore onClick={() => {
                    setPageData({...pageData, page: pageData.page + 1})
                }}/> : ''
            }

        </div>)
}

export default Playlist