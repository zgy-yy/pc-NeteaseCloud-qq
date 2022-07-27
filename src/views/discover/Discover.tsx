import React, {useEffect, useState} from "react";
import styles from './descover.module.scss'
import Swiper from "@/commponents/common/banner/Swiper";
import {usePersonalized, usePersonalizedMv, usePersonalizedNewSong} from "@/api/api";
import {Personalized, PersonalizedMv, PersonalizedNewSong} from "@/models/personalized";
import CoverPlay from "@/commponents/common/coverPlay/CoverPlay";
import PersonalNewSong from "@/views/discover/personalizedNewSong/PersonalNewSong";

const Discover: React.FC = () => {
    const [personalized, setPersonalized] = useState<Personalized[]>([])
    const [newSong, setNewSong] = useState<PersonalizedNewSong[]>([])
    const [MV,setMv] = useState<PersonalizedMv[]>([])
    useEffect(() => {
        usePersonalized().then(data => {
            setPersonalized(data.sampleSize(10))
        })
        usePersonalizedNewSong().then(data => {
            setNewSong(data)
        })
        usePersonalizedMv().then(data=>{
           setMv(data)
        })
    }, [])

    return <div className={styles.container}>
        <h1>推荐</h1>
        <Swiper/>
        <p>专属歌单</p>
        <div className={styles.personalized}>
            {
                personalized.map(item => {
                    return <CoverPlay params={item} key={item.id}/>
                })
            }
        </div>
        <p>推荐音乐</p>
        <div className={styles.newSong}>
            {
                newSong.map(item => {
                    return <PersonalNewSong params={item} key={item.id}/>
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

export default Discover