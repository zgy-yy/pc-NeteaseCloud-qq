import './App.css'
import Menu from "./commponents/layout/menu/Menu";
import Header from "@/commponents/layout/header/Header";
import Discover from "@/views/discover/Discover";
import {Route, Routes} from "react-router-dom";
import Music from "@/views/music/Music";
import Picked from "@/views/music/picked/Picked";
import Toplist from "@/views/music/toplist/Toplist";
import Artist from "@/views/music/artist/Artist";
import Catgory from "@/views/music/catgory/Catgory";
import Video from "@/views/video/Video";
import Playlist from "@/views/playlist/Playlist";
import Player from "@/commponents/layout/player/Player";
import {useAppSelector} from "@/store";
import {setShowList} from "@/store/songList";
import {useDispatch} from "react-redux";
import MvPlayer from "@/views/mvPlayer/MvPlayer";


function App() {

    const {showList} = useAppSelector(state => state.songList);
    const dispatch = useDispatch()
    return (
        <div className={`App ${showList ? 'showMask' : ''}`} onClick={() => {
            dispatch(setShowList(false))
        }}>
            <Menu/>
            <div className='main'>
                <div className='view'>
                    <Header></Header>
                    <div>
                        <Routes>
                            <Route path='/' element={<Discover/>}/>
                            <Route path='/discover' element={<Discover/>}></Route>
                            <Route path='/music' element={<Music/>}>
                                <Route path='/music/' element={<Picked/>}></Route>
                                <Route path='/music/picked' element={<Picked/>}></Route>
                                <Route path='/music/toplist' element={<Toplist/>}></Route>
                                <Route path='/music/artist' element={<Artist/>}></Route>
                                <Route path='/music/category' element={<Catgory/>}></Route>
                                <Route path='/music/*' element={<div>正在开发</div>}></Route>
                            </Route>
                            <Route path='/video' element={<Video/>}/>
                            <Route path='/playlist' element={<Playlist/>}/>
                            <Route path='/mvPlayer' element={<MvPlayer/>}/>
                            <Route path='/*' element={<div>正在开发</div>}/>
                        </Routes>
                    </div>
                </div>
                <Player/>
            </div>
        </div>
    )
}

export default App
