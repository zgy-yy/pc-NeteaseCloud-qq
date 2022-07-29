import React, {useEffect, useMemo, useRef, useState} from "react";
import sy from './player.module.scss'
import {useAppSelector} from "@/store";
import {useDispatch} from "react-redux";
import {setCurIndex, setShowList} from "@/store/songList";
import {useFormatDuring} from "@/utils/number";
import {Song} from "@/models/song";
import {useSongUrl} from "@/api/api";
import {first} from "lodash";


let interVal: number = -1
type PMode = 'random' | 'sequence' | 'single'

const Player: React.FC = () => {

    const audioRef = useRef<HTMLAudioElement>(null)

    const {length, list, showList, curIndex} = useAppSelector(state => {
        return state.songList
    })

    let curSong: Song = {
        a: undefined,
        al: {
            id: -1,
            name: "",
            pic: -1,
            picUrl: "http://localhost:3002/src/assets/img/OpticalDisk.png",
            pic_str: "-1",
            tns: []
        },
        alia: [],
        ar: [{id: 0, name: 'z&gy', tns: Array(0), alias: Array(0)}],
        cd: "",
        cf: "",
        copyright: 0,
        cp: 0,
        crbt: undefined,
        djId: 0,
        dt: 0,
        entertainmentTags: undefined,
        fee: 0,
        ftype: 0,
        h: {br: 320000, fid: 0, size: 7699897, vd: -4534},
        id: 0,
        l: {br: 128000, fid: 0, size: 3079985, vd: -168},
        m: {br: 192000, fid: 0, size: 4619955, vd: -1898},
        mark: 0,
        mst: 0,
        mv: 0,
        no: 0,
        noCopyrightRcmd: undefined,
        originCoverType: 0,
        originSongSimpleData: undefined,
        pop: 0,
        pst: 0,
        publishTime: 0,
        resourceState: false,
        rt: undefined,
        rtUrl: undefined,
        rtUrls: [],
        rtype: 0,
        rurl: undefined,
        s_id: 0,
        single: 0,
        songJumpInfo: undefined,
        st: 0,
        t: 0,
        tagPicList: undefined,
        v: 0,
        version: 0,
        name: "聆听 音乐"
    }

    if (curIndex >= 0 && curIndex < length) {
        curSong = list[curIndex]
    }
    const dispatch = useDispatch();

    const [playMode, setPlayMode] = useState<PMode>('sequence')

    function nextMusic() {
        if (playMode == 'sequence' || playMode == 'single') {
            dispatch(setCurIndex((curIndex + 1) % length))
        } else {
            const randomIndex = Math.floor(Math.random() * (length - 0))
            dispatch(setCurIndex(randomIndex))
        }
    }

    function perMusic() {
        if (playMode == 'sequence' || playMode == 'single') {
            dispatch(setCurIndex((curIndex + length - 1) % length))
        } else {
            const randomIndex = Math.floor(Math.random() * (length - 0))
            dispatch(setCurIndex(randomIndex))
        }
    }

    const [playState, setPlayState] = useState(false)
    const audio = useMemo(() => {
        return audioRef.current
    }, [audioRef.current])

    useEffect(() => {
        if (audio) {
            if (curIndex >= 0 && length > 0) {
                useSongUrl(curSong.id).then(data => {
                    audio.src = data.url
                    audio.play().then(r => {
                        setPlayState(true)
                    })
                })
            }
        }

    }, [list, curIndex])

    useEffect(() => {
        if (audio) {
            if (audio.src) {
                if (playState) {
                    audio.play()
                } else {
                    audio.pause()
                }
            } else {
                setTimeout(() => {
                    setPlayState(false)
                }, 600)
            }
        }
    }, [playState])

    const [time, setTime] = useState({cur: 0, total: 1})
    if (interVal == -1) {
        interVal = setInterval(() => {
            if (audioRef.current) {
                const audio = audioRef.current
                if (audio.duration) {
                    console.log(audio.currentTime, audio.duration)
                    setTime({cur: audio.currentTime, total: audio.duration})
                }
            }

        }, 1000)
    }

    return (
        <div className={sy.playerBox}>
            <p className={sy.pressBar} style={{width: `${time.cur / time.total * 100}%`}}>
                <span draggable="true"
                      onDrag={(event) => {
                          // @ts-ignore
                          const total: HTMLDivElement = event.nativeEvent.path[2]
                          // @ts-ignore
                          const progress: HTMLParagraphElement = event.nativeEvent.path[1]
                          const offset = event.clientX - total.offsetLeft > total.clientWidth ? total.clientWidth : event.clientX - total.offsetLeft
                          progress.style.width = offset / total.clientWidth * 100 + '%'
                          clearInterval(interVal)
                      }}
                      onDragEnd={(event) => {
                          // @ts-ignore
                          const total: HTMLDivElement = event.nativeEvent.path[2]
                          // @ts-ignore
                          const progress: HTMLParagraphElement = event.nativeEvent.path[1]
                          const offset = event.clientX - total.offsetLeft > total.clientWidth ? total.clientWidth : event.clientX - total.offsetLeft
                          if (audio) {
                              if (audio.duration > 0) {
                                  audio.currentTime = offset / total.clientWidth * audio.duration
                              }
                          }
                          interVal = setInterval(() => {
                              if (audioRef.current) {
                                  const audio = audioRef.current
                                  if (audio.duration) {
                                      console.log(audio.currentTime, audio.duration)
                                      setTime({cur: audio.currentTime, total: audio.duration})
                                  }
                              }
                          }, 1000)
                      }}
                ></span>
            </p>
            <audio ref={audioRef}></audio>

            <div className={sy.musicInfo}>
                <img src={curSong.al.picUrl} alt={''}/>
                <div>
                    <p>{curSong.name} - {curSong.ar.first().name}</p>
                    <p>
                        <span className={`iconfont icon-biaoji`}></span>
                        <span className='iconfont icon-xiazaibendi'></span>
                    </p>
                </div>
            </div>
            <div className={sy.opt}>
                <span className={`iconfont icon-${playMode}`} onClick={() => {
                    playMode == 'sequence' ? setPlayMode('random') :
                        playMode == 'random' ? setPlayMode('single') : setPlayMode('sequence')
                }}></span>
                <span className='iconfont icon-shangyishouge' onClick={perMusic}></span>
                <span className={`iconfont icon-${playState ? 'zanting' : 'bofang'}`}
                      onClick={() => {
                          setPlayState(!playState)
                      }}
                ></span>
                <span className='iconfont icon-xiayishou' onClick={nextMusic}></span>
                <span className='iconfont icon-zhongdengyinliang'></span>
            </div>
            <div className={sy.time}>
                <span>{useFormatDuring(time.cur)}/{useFormatDuring(time.total)}</span>
                <span className='iconfont icon-bofanggedan'
                      onClick={(event) => {
                          dispatch(setShowList(true))
                          event.stopPropagation()
                      }}
                ></span>
            </div>

            {
                showList ? <div className={sy.list}>
                    <p>播放列表</p>
                    <p>
                        <span>共 {length} 首歌曲</span>
                        <span>清空</span>
                    </p>
                    {
                        list.map((item, index) => {
                            return <div key={item.id}
                                        onClick={event => {
                                            dispatch(setCurIndex(index))
                                            event.stopPropagation()
                                        }}
                            >
                                <img src={item.al.picUrl} alt={''}/>
                                <p>
                                    <span>{item.name}</span>
                                    <span> {item.ar.first().name}</span>
                                </p>
                                <p>{useFormatDuring(item.dt / 1000)}</p>
                            </div>
                        })
                    }
                </div> : ''
            }
        </div>
    )
}

export default Player