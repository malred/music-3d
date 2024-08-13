import {motion} from "framer-motion";
import React from "react";
import {useNavigate} from "react-router-dom";

function ShowPlaylistItem({item, itemsVariant}) {
    const navigate = useNavigate()

    return (
        <motion.div
            onClick={() => {
                navigate(`/musics/list/detail/${item.id}`)
            }}
            className={' cursor-pointer flex flex-col gap-2'}
            variants={itemsVariant}
            initial="initial"
            whileInView="animate"
        >
            <img className={'w-36 h-36 hover:scale-110 transition duration-300'}
                 src={item.cover} alt=""/>
            <span>{item.name}</span>
        </motion.div>
    )
}

function areEqual(prevProps, nextProps) {
    /*
    如果把 nextProps 传入 render 方法的返回结果与
    将 prevProps 传入 render 方法的返回结果一致则返回 true，
    否则返回 false
    */
    return prevProps.item === nextProps.item
}

// 优化 防止重复渲染
export default React.memo(ShowPlaylistItem, areEqual);