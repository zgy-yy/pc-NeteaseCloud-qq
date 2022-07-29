import styles from './picked.module.scss'
import React, {useEffect, useState} from "react";
import Swiper from "@/commponents/common/banner/Swiper";
import {
    usePersonalizedDjProgram,
    usePersonalizedMv,
    usePersonalizedPrivateContentList,
    useTopPlaylistHighquality
} from "@/api/api";
import {PersonalizedPrivateContent} from "@/models/video";
import CoverPlay from "@/commponents/common/coverPlay/CoverPlay";
import {DjProgram, PersonalizedMv} from "@/models/personalized";

const Picked: React.FC = () => {

    const [personalizedPrivateContentList,setPersonalizedPrivateContentList]=useState<PersonalizedPrivateContent[]>([])
    const [MV,setMv] = useState<PersonalizedMv[]>([])
    const [dj,setDj] = useState<DjProgram[]>([])
    useEffect(()=>{
        usePersonalizedPrivateContentList(4).then(data=>{
            setPersonalizedPrivateContentList(data)
        })
        usePersonalizedMv().then(data=>{
            setMv(data)
        })
        usePersonalizedDjProgram().then(data=>{
            setDj(data)
        })
    },[])

    return <div className={styles.container}>
        <Swiper/>
        <p>独家放送</p>
        <div className={styles.vid}>
            {
                personalizedPrivateContentList.map(item=>{
                 return   <CoverPlay params={item} key={item.id}/>
                })
            }
        </div>
        <p>推荐电台</p>
        <div className={styles.dj}>
            {
                dj.map(item=>{
                    return <CoverPlay params={item} key={item.id}/>
                })
            }
        </div>
        <p>推荐MV</p>
        <div className={styles.mv}>
            {
                MV.map(item=>{
                    return <CoverPlay params={item} key={item.id}/>
                })
            }
        </div>

    </div>
}

export default Picked