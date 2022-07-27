import styles from './personalizedNewSong.module.scss'
import React from "react";
import {PersonalizedNewSong} from "@/models/personalized";

const PersonalNewSong: React.FC<{params:PersonalizedNewSong}> = (props) => {

    const {name,picUrl,song} = props.params

    return <div className={styles.container}>
        <img src={picUrl}/>
        <div className={styles.msg}>
            <span>{name}</span>
            <span className={styles.singer}>{song.artists[0].name}</span>
        </div>
    </div>
}

export default PersonalNewSong