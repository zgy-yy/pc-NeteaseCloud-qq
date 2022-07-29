import styles from './artist.module.scss'
import {artistData} from "@/views/music/artist/artistData";
import React, {useEffect, useState} from "react";
import {userArtistList} from "@/api/api";
import {Artist as ArtistMo} from "@/models/artist";
import Singer from "@/commponents/common/singer/Singer";
import LoadMore from "@/commponents/common/loadmore/LoadMore";

const Artist: React.FC = () => {
    const [checked, setChecked] = useState<string[]>(['全部', '所有', '热门'])
    const [pageData, setPageData] = useState({
        init: false,
        loading: false,
        page: 1,
        limit: 60,
        initial: "-1",
        type: -1,
        area: -1,
    })
    const [artists, setArtists] = useState<ArtistMo[]>([])

    useEffect(() => {
        userArtistList(pageData).then(data => {
            if (pageData.page == 1) {
                setArtists(data)
            } else {
                setArtists([...artists, ...data])
            }
        })
    }, [pageData])

    function optionChange(type: number, key: string, name: string) {
        checked[type] = name
        setChecked([...checked])
        if (type === 0) setPageData({...pageData, area: Number(key), page: 1})
        if (type === 1) setPageData({...pageData, type: Number(key), page: 1})
        if (type === 2) setPageData({...pageData, initial: key, page: 1})

    }

    function loadMore() {
        setPageData({...pageData, page: pageData.page + 1})
    }

    return <div>
        {
            artistData.map(artist => {
                return <div key={artist.key}>
                    <div className={styles.key}>
                        <div>{artist.name}</div>
                        <div className={styles.list}>
                            {
                                artist.list.map(item => {
                                    return <span className={checked.includes(item.name) ? styles.checked : ''}
                                                 onClick={() => optionChange(artist.type, item.key, item.name)}
                                                 key={item.name}>{item.name}</span>
                                })
                            }
                        </div>
                    </div>
                </div>
            })
        }
        <div className={styles.artis}>
            {
                artists.map(item => {
                    return <Singer prams={item} key={item.id}/>
                })
            }
        </div>
        <LoadMore onClick={loadMore}/>
    </div>
}

export default Artist