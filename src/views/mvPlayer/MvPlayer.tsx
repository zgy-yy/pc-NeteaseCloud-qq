import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useLogin, useMvUrl} from "@/api/api";


const MvPlayer: React.FC = () => {

    const {id} = useLocation().state as { id: number };

    console.log(id)
    const [url, setUrl] = useState('')
    useEffect(() => {
        useMvUrl(id).then(data => {
            console.log(data.url)
            setUrl(data.url)
        })
    }, [])

    return <div>
        <video src={url} controls={true}></video>
    </div>
}

export default MvPlayer