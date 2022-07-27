import React from "react";
import {Artist} from "@/models/artist";
import sy from './singer.module.scss'
const Singer:React.FC<{prams:Artist}>=(props)=>{
    const {name,picUrl,img1v1Url} = props.prams
    return  <div className={sy.container}>
        <div style={{backgroundImage:`url(${picUrl})`}}></div>
        <p>{name}</p>
    </div>
}

export  default Singer