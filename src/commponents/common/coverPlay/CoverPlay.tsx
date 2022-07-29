import React, {useEffect, useState} from "react";
import styles from './coverPlay.module.scss'
import {DjProgram, Personalized, PersonalizedMv} from "@/models/personalized";
import {useNumberFormat} from "@/utils/number";
import {PersonalizedPrivateContent} from "@/models/video";
import {useNavigate} from "react-router-dom";
import {useMvUrl} from "@/api/api";
import Player from "xgplayer"

interface Prop {
    type: number
    id: number
    picUrl: string
    name: string
    playCount: number
}

// .type = 5 Mv; =0 songlist ;=1 dj ; =2 榜单
const CoverPlay: React.FC<{ className?: string, params: Prop | Personalized | PersonalizedMv | PersonalizedPrivateContent | DjProgram }> = (props) => {

    const type = props.params.type

    let picUrl: string = '', name: string = '', playCount: number = 0

    const param = props.params
    picUrl = param.picUrl
    name = param.name
    const id = param.id

    if (type == 0) { //歌单
        const param = props.params as Personalized
        playCount = param.playCount
    } else if (type == 1) { //dj
        const param = props.params as DjProgram
    } else if (type == 2){ //榜单
        const param = props.params as Prop
        playCount = param.playCount
    } else if (type == 5) { //视频 video
        const param = props.params as PersonalizedMv
        playCount = param.playCount
    }


   const nav=useNavigate();
   function goPlayListPage(){
       if (type==0||type==2){ //歌单列表
           nav('/playlist',{state:{id:id,type:0}})
       }
       if (type==5){
         nav('/mvPlayer',{state:{id:id}})
       }
    }

    return <div
        onClick={()=>{goPlayListPage()}}
        className={`${props.className} ${styles.cover} ${type == 5 ? styles.video : ''}  ${type == 1 ? styles.dj : ''}`}
    >
        <div className={styles.img} style={{backgroundImage: `url(${picUrl})`}}>
            <div className={styles.mask}>
                <i className={'iconfont icon-bofang'}></i>
            </div>
            {playCount?<span
                className={`iconfont ${type == 0 ? 'icon-suishenting' : ''} 
                ${type == 5 ? 'icon-bofang' : ''}`}>{useNumberFormat(playCount)}</span>:''}
        </div>
        {
            type !== 2 ? <p className={styles.dic}>
                {name}
            </p> : ''
        }

        <div id="mse"></div>
    </div>
}

export default CoverPlay