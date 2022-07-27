import React from "react";
import styles from './banner.module.scss'
import {useBanner} from "@/api/api";

const Banner:React.FC=()=>{
    useBanner().then(res=>{
        console.log(res)
    })

    return <div className={styles.container}>
        <div className={styles.swiper}></div>
    </div>
}
export default Banner