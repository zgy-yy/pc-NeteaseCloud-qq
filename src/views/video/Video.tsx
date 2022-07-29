import React, {useEffect, useState} from "react";
import sy from './video.module.scss'
import {useVideoGroup, useVideoGroupList} from "@/api/api";
import {Video as VideoMo, VideoGroup} from "@/models/video";
import CoverPlay from "@/commponents/common/coverPlay/CoverPlay";

const Video:React.FC=()=>{
    const [pageData,setPageData] = useState({
        page: 1,
        id: 0,
    })
    const [videoList,setVideoList] = useState<VideoMo[]>([])
    const [gop,setGop] = useState<VideoGroup[]>([])
    useEffect(()=>{
        useVideoGroup(pageData.id,pageData.page-1).then(data=>{
            console.log(data)
            setVideoList(data)
        })
        useVideoGroupList().then(data=>{
            setGop(data)
        })
    }, [])

    useEffect(()=>{
        useVideoGroup(pageData.id,pageData.page-1).then(data=>{
            setVideoList(data)
        })
    },[pageData])

    function changeID(id:number) {
        setPageData({page: 1,id:id })
    }

    return <div>
        <div className={sy.cat}>
            <div className={sy.left}>
                <span>全部视频</span>
                <div className={sy.gop}>
                    {
                        gop.map(item=>{
                            return <span
                                className={pageData.id==item.id?sy.curId:''}
                                onClick={()=>{changeID(item.id)}}
                                key={item.id}>{item.name}</span>
                        })
                    }
                </div>
            </div>
        </div>
        <div className={sy.list}>
            {
                videoList.map(vido=>{
                    return <CoverPlay key={vido.data.vid} params={{type:5,id:Number(vido.data.vid),name:vido.data.title,picUrl:vido.data.coverUrl,playCount:vido.data.playTime}}></CoverPlay>
                })
            }
        </div>
    </div>
}

export default Video