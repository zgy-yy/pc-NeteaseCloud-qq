import styles from './toplist.module.scss'
import React, {useEffect, useState} from "react";
import {useTopListDetail} from "@/api/api";
import {TopListDetail} from "@/models/toplist_detail";
import {useNumberFormat} from "@/utils/number";
import CoverPlay from "@/commponents/common/coverPlay/CoverPlay";

const Toplist: React.FC = () => {
    const[toplist,setToplist] = useState<TopListDetail[]>([])
    useEffect(()=>{
        useTopListDetail().then(res=>{
            setToplist(res)
        })
    },[])
    return <div>
        <p>官方榜</p>
        <div className={styles.gar}>
            {
                toplist.slice(0,4).map(item=>{
                    return <div className={styles.item}>
                        <CoverPlay className={styles.cover} params={{type:2,name:item.name,picUrl:item.coverImgUrl,playCount:item.playCount}} key={item.id}/>
                       <div className={styles.right}>
                           <h3>{item.name}</h3>
                           <div className={styles.song}>
                               {
                                   item.tracks.map((song,index)=>{
                                       return <p key={song.first}>{index+1} {song.first} -{song.second}</p>
                                   })
                               }

                           </div>
                       </div>
                    </div>
                })
            }
        </div>
        <p>特色榜</p>
        <div className={styles.special}>
            {
                toplist.slice(4).map(item=>{
                    return <CoverPlay   params={{type:0,name:item.name,picUrl:item.coverImgUrl,playCount:item.playCount}} key={item.id}/>
                })
            }
        </div>
    </div>
}

export default Toplist