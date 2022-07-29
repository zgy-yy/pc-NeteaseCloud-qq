import React from "react";
import {Artist} from "@/models/artist";
import sy from './singer.module.scss'
import {useNavigate} from "react-router-dom";
const Singer:React.FC<{prams:Artist}>=(props)=>{
    const {name,picUrl,img1v1Url} = props.prams


    const navigate = useNavigate();
    function handleClick() {
        navigate('/playlist',{state:{id:props.prams.id,type:1}})
    }

    return  <div onClick={()=>{handleClick()}} className={sy.container}>
        <div style={{backgroundImage:`url(${picUrl})`}}></div>
        <p>{name}</p>
    </div>
}

export  default Singer