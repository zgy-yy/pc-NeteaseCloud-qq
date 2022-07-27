import React from "react";
import styles from './user.module.scss'

const User: React.FC = () => {

    return <div className={styles.container}>
        <p className={styles.cover}/>
        <span>name</span>
        <span className="iconfont icon-fenxiangyemian"></span>
        <span className="iconfont icon-jiangbei"></span>
        <span className="iconfont icon-dengji"></span>
    </div>
}

export default User

