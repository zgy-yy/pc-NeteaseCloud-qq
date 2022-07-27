import './App.css'
import Menu from "./commponents/layout/menu/Menu";
import Header from "@/commponents/layout/header/Header";
import Discover from "@/views/discover/Discover";
import {Outlet, Route, Routes} from "react-router-dom";
import Music from "@/views/music/Music";
import Picked from "@/views/music/picked/Picked";
import Toplist from "@/views/music/toplist/Toplist";
import Artist from "@/views/music/artist/Artist";
import Catgory from "@/views/music/catgory/Catgory";


function App() {


    return (
        <div className="App">
            <Menu/>
            <div className='main'>
                <Header></Header>
                <div className='view'>
                    <Routes>
                        <Route path='/' element={<Discover/>} />
                        <Route path='/discover' element={<Discover/>}></Route>
                        <Route path='/music' element={<Music/>}>
                            <Route path='/music/' element={<Picked/>}></Route>
                            <Route path='/music/picked' element={<Picked/>}></Route>
                            <Route path='/music/toplist' element={<Toplist/>}></Route>
                            <Route path='/music/artist' element={<Artist/>}></Route>
                            <Route path='/music/category' element={<Catgory/>}></Route>

                            <Route path='/music/*' element={<div>正在开发</div>}></Route>
                        </Route>
                        <Route path='/*' element={<div>正在开发</div>} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App
