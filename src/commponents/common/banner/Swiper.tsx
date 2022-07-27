import React, {useEffect, useState} from "react";
import styles from './swiper.module.scss'
import {useBanner} from "@/api/api";
import {Banner} from "@/models/banner";

const Swiper: React.FC = () => {
    const [swipers, setSwipers] = useState<Banner[]>([])
    const [offset,setOffset] = useState(0)
    useEffect(()=>{
        useBanner().then(swipers => {
            setSwipers(swipers)
        })
    },[])

    setTimeout(()=>{
        setOffset(offset-1<-3?0:offset-1)
    },3000)

    return <div className={styles.swiper}>
            {swipers.map(swiper => {
                return <div className={styles.banner}
                            style={{transform: `translateX(${offset*100}%)`}}
                            key={swiper.bannerId}>
                    <img src={swiper.pic}/>
                </div>
            })}
        </div>

}
export default Swiper