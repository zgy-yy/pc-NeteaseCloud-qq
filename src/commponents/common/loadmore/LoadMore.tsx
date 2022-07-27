import React from "react";
import sy from './loadMore.module.scss'

const LoadMore: React.FC<{onClick?:()=>void}> = (props) => {


    return <div className={sy.more} onClick={props.onClick}>
        加载更多...
    </div>
}
export default LoadMore