import styles from './music.module.scss'
import React, {useState} from "react";
import {menusData} from "@/views/music/musicMenu";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

const Music: React.FC = () => {
    const pathName = useLocation().pathname
    const site = pathName.lastIndexOf("\/");
    const path = pathName.substring(site + 1, pathName.length);
    const menuIndex = menusData.findIndex((item) =>{
        return item.name == path
    })

    const navigate = useNavigate();

    const [curMenu, setCurMenu] = useState(menusData[menuIndex<0?0:menuIndex].label)

    function handleClick(name: string, label: string) {
        setCurMenu(label)
        navigate('/music/' + name)
    }


    function tranX(): number {
        const index = menusData.findIndex((item) => {
            return item.label == curMenu
        })
        let labelLen = 0
        for (let i = 0; i < index; i++) {
            labelLen += menusData[i].label.length
        }
        return index * 4 + labelLen;
    }

    return <div className={styles.container}>
        <h1>音乐馆</h1>
        <div className={styles.menu}>
            <p className={styles.selectBar}
               style={{width: `${curMenu.length}rem`, transform: `translateX(${tranX()}rem)`}}
            ></p>
            {
                menusData.map(menu => {
                    return <p className={curMenu === menu.label ? styles.selectedMenu : ''} key={menu.name}
                              onClick={() => {
                                  handleClick(menu.name, menu.label)
                              }}
                    >{menu.label}</p>
                })
            }
        </div>
        <Outlet/>
    </div>
}

export default Music