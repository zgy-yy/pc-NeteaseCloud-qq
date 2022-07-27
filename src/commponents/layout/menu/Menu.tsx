import React from "react";
import styles from './menu.module.scss'
import {menus} from "./menuData";
import {useLocation, useNavigate} from "react-router-dom";

const Menu: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation()
    const path = location.pathname
    function goPage(key:string){
        navigate(key)
    }

    return <div className={styles.menuContainer}>
        {
            menus.map(menu => {
                return (
                    <div className={styles.menu} key={menu.name}>
                        <div className={styles.menuTile}>{menu.name}</div>
                        {
                            menu.menus.map(item => {
                                return <div
                                    onClick={() => {
                                        goPage(item.key)
                                    }}
                                    className={`${styles.menuItem} ${path.includes(item.key) ? styles.activeItem : ''}`}
                                    key={item.key}><i className={`iconfont ${item.icon} ${styles.icon}`}></i>{item.name}
                                </div>
                            })
                        }
                    </div>)
            })
        }
    </div>
}

export default Menu