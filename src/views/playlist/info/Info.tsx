import React from "react";
import {PlayListDetail} from "@/models/playlist";
import sy from './info.module.scss'
import {ArtistDetail} from "@/models/artist_detail";

const Info: React.FC<{ playlistDetail: PlayListDetail | undefined, artistDetail: ArtistDetail | undefined, onClick: () => void }> = (props) => {
    const playlistDetail = props.playlistDetail
    const artistDetail = props.artistDetail

    if (playlistDetail) {
        const info = playlistDetail
        return <div>
            <div className={sy.info}>
                <img src={info.coverImgUrl} alt={''}/>
                <div className={sy.msg}>
                    <h2>{info.name}</h2>
                    <div className={sy.tag}>
                        <img src={info.creator.avatarUrl}/>
                        <p>{info.creator.nickname}</p>
                        {
                            info.tags.map(tag => {
                                return <span key={tag}>#{tag}</span>
                            })
                        }
                    </div>
                    <p className={sy.dic}>{info.description}</p>
                    <div className={sy.btn} onClick={() => {
                        props.onClick()
                    }
                    }>播放全部
                    </div>
                </div>
            </div>
        </div>
    }

    if (artistDetail) {
        const info = artistDetail
        return <div>
            <div className={sy.info}>
                <img className={sy.singerCover} src={info.artist.cover} alt={''}/>
                <div className={sy.msgSinger}>
                    <h2>{info.artist.name}</h2>
                    <div className={sy.desc}>
                        <p>{info.artist.briefDesc}</p>
                    </div>
                    <p className={sy.count}>
                        <span>单曲数:{info.artist.musicSize}</span>
                        <span>专辑数:{info.artist.albumSize}</span>
                        <span> MV数:{info.artist.mvSize}</span>
                    </p>
                    <div className={sy.btn}>关注</div>
                </div>
            </div>

        </div>
    }

    return <div></div>
}
export default Info