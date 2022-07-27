import React, {useEffect, useState} from "react";
import {PlayListDetail, PlaylistHighqualityTag} from "@/models/playlist";
import {usePlaylistHighqualityTags, useTopPlaylistHighquality} from "@/api/api";
import sy from './catgory.module.scss'
import CoverPlay from "@/commponents/common/coverPlay/CoverPlay";
import LoadMore from "@/commponents/common/loadmore/LoadMore";

const Catgory: React.FC = () => {

    const [tags, setTags] = useState<PlaylistHighqualityTag[]>([])
    const [pageData, setPageData] = useState({
        init: false,
        loading: false,
        limit: 35,
        before: 0,
        more: false,
        cat: "全部"
    })
    const [hasMore, setHasMore] = useState(false)

    const [list, setList] = useState<PlayListDetail[]>([])
    useEffect(() => {
        usePlaylistHighqualityTags().then(data => {
            data.unshift({category: 0, hot: false, id: 0, name: "全部", type: 0})
            setTags(data)
        })

        useTopPlaylistHighquality({
            limit: pageData.limit,
            before: pageData.before,
            cat: pageData.cat,
        }).then(data => {
            if (pageData.before <= 0) {
                setList(data.playlists)
            } else {
                setList([...list, ...data.playlists])
            }
            pageData.more = data.more
            pageData.before = data.lasttime
            pageData.init = false
            setHasMore(data.more)
        })
    }, [pageData])

    function getMore() {
        if (pageData.more) {
            setPageData({...pageData})
        }
    }

    function changeCat(cat: string) {
        pageData.before = 0
        setPageData({...pageData, cat: cat, before: 0, init: false})
    }

    return <div>
        <div className={sy.tags}>
            {
                tags.map(tag => {
                    return <p onClick={() => {
                        changeCat(tag.name)
                    }}
                              className={pageData.cat == tag.name ? sy.curTag : ''}
                              key={tag.id}>{tag.name}</p>
                })
            }
        </div>
        <h3 className={sy.title}>{pageData.cat}</h3>
        <div className={sy.list}>
            {
                list.map(item => {
                    return <CoverPlay
                        className={sy.cover}
                        key={item.id}
                        params={{type: 0, name: item.name, picUrl: item.coverImgUrl, playCount: item.playCount}}/>
                })
            }
        </div>
        {
            hasMore?<LoadMore onClick={getMore}/>:''
        }
    </div>
}

export default Catgory