import React from "react";
import styles from "./header.module.scss"
import SearchPop from "@/commponents/layout/header/searchPop/SearchPop";
import User from "@/commponents/layout/header/user/User";


const Header:React.FC =()=>{

    return <div className={styles.headerContainer}>
        <div className={`${styles.navBar}`}>
            <span className={`iconfont icon-a-Frame19 ${styles.nav}`}></span>
            <span className={`iconfont icon-a-Frame18 ${styles.nav}`}></span>
            <SearchPop/>
        </div>
        <User></User>
    </div>
}

export default Header;